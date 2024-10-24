import { QueryService } from '@nestjs-query/core';
import { InjectPubSub } from '@nestjs-query/query-graphql';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Inject, Logger } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverStatus } from '@ridy/database/enums/driver-status.enum';
import { OrderStatus } from '@ridy/database/enums/order-status.enum';
import { RequestActivityType } from '@ridy/database/enums/request-activity-type.enum';
import { RequestActivityEntity } from '@ridy/database/request-activity.entity';
import { RequestEntity } from '@ridy/database/request.entity';
import { RiderNotificationService } from '@ridy/order/firebase-notification-service/rider-notification.service';
import { GoogleServicesService } from '@ridy/order/google-services/google-services.service';
import { SharedDriverService } from '@ridy/order/shared-driver.service';
import { SharedOrderService } from '@ridy/order/shared-order.service';
import { DriverRedisService } from '@ridy/redis/driver-redis.service';
import { OrderRedisService } from '@ridy/redis/order-redis.service';
import { ForbiddenError } from 'apollo-server-core';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';

import { UserContext } from '../auth/authenticated-user';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderService } from './order.service';

@QueryService(RequestEntity)
export class DriverOrderQueryService extends TypeOrmQueryService<RequestEntity> {
  constructor(
    @InjectRepository(RequestEntity)
    public orderRepository: Repository<RequestEntity>,
    @InjectRepository(RequestActivityEntity)
    private activityRepository: Repository<RequestActivityEntity>,
    private driverService: SharedDriverService,
    private orderService: OrderService,
    private orderRedisService: OrderRedisService,
    private driverRedisService: DriverRedisService,
    private googleServices: GoogleServicesService,
    private sharedOrderService: SharedOrderService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    @Inject(CONTEXT) private context: UserContext,
    private riderNotificationService: RiderNotificationService
  ) {
    super(orderRepository);
  }

  async updateOne(
    id: number,
    update: UpdateOrderInput
  ): Promise<RequestEntity> {
    let order = await this.orderRepository.findOne(id, {
      relations: ['rider', 'service', 'options'],
    });
    switch (update.status) {
      case OrderStatus.DriverCanceled: {
        await this.activityRepository.insert({
          requestId: id,
          type: RequestActivityType.CanceledByDriver,
        });
        const cancelResult = await this.orderService.cancelOrder(id);
        order = await this.orderRepository.findOne(id, {
          relations: [
            'rider',
            'service',
            'options',
            'conversation',
            'driver',
            'driver.car',
            'driver.carColor',
          ],
        });
        this.riderNotificationService.canceled(order.rider);
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
        return cancelResult;
      }

      case OrderStatus.DriverAccepted: {
        const [travel, driverLocation] = await Promise.all([
          this.orderRepository.findOne(id),
          this.driverRedisService.getDriverCoordinate(this.context.req.user.id),
        ]);
        this.activityRepository.insert({
          requestId: travel.id,
          type: RequestActivityType.DriverAccepted,
        });
        const allowedStatuses = [
          OrderStatus.Found,
          OrderStatus.NoCloseFound,
          OrderStatus.Requested,
          OrderStatus.Booked,
        ];
        if (travel == null || !allowedStatuses.includes(travel.status)) {
          throw new ForbiddenError('Already Taken');
        }
        const metrics =
          driverLocation != null
            ? await this.googleServices.getSumDistanceAndDuration([
                travel.points[0],
                driverLocation,
              ])
            : { distance: 0, duration: 0 };
        const dt = new Date();
        const etaPickup = dt.setSeconds(dt.getSeconds() + metrics.duration);
        this.driverService.updateDriverStatus(
          this.context.req.user.id,
          DriverStatus.InService
        );
        await this.orderRedisService.expire([id]);
        await super.updateOne(id, {
          status: OrderStatus.DriverAccepted,
          etaPickup: new Date(etaPickup),
          driverId: this.context.req.user.id,
        });
        order = await this.orderRepository.findOne(id, {
          relations: [
            'rider',
            'service',
            'options',
            'conversation',
            'driver',
            'driver.car',
            'driver.carColor',
          ],
        });
        this.riderNotificationService.accepted(order.rider);

        this.pubSub.publish('orderUpdated', { orderUpdated: order });
        this.pubSub.publish('orderRemoved', { orderRemoved: order }); // This one has a filter to let know all except the one accepted.
        return order;
      }

      case OrderStatus.Arrived:
      case OrderStatus.Started: {
        await super.updateOne(id, { status: update.status });
        this.activityRepository.insert({
          requestId: id,
          type:
            update.status == OrderStatus.Arrived
              ? RequestActivityType.ArrivedToPickupPoint
              : RequestActivityType.Started,
        });
        //result.driver = await this.driverService.driverRepo.findOne(this.context.req.user.id, {relations: ['car', 'carColor']});
        if (update.status == OrderStatus.Arrived) {
          this.riderNotificationService.arrived(order.rider);
        } else {
          this.riderNotificationService.started(order.rider);
        }
        order = await this.orderRepository.findOne(id, {
          relations: [
            'rider',
            'service',
            'options',
            'conversation',
            'driver',
            'driver.car',
            'driver.carColor',
          ],
        });
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
        return order;
      }

      case OrderStatus.Finished: {
        await this.sharedOrderService.finish(id, update.paidAmount);
        this.activityRepository.insert({
          requestId: id,
          type: RequestActivityType.ArrivedToDestination,
        });
        order = await this.orderRepository.findOne(id, {
          relations: [
            'rider',
            'service',
            'options',
            'conversation',
            'driver',
            'driver.car',
            'driver.carColor',
          ],
        });
        if (order.paidAmount + update.paidAmount < order.costAfterCoupon) {
          this.riderNotificationService.waitingForPostPay(order.rider);
        } else {
          this.riderNotificationService.finished(order.rider);
        }
        order = await this.orderRepository.findOne(id, {
          relations: [
            'rider',
            'service',
            'options',
            'conversation',
            'driver',
            'driver.car',
            'driver.carColor',
          ],
        });
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
        return order;
      }

      default:
        throw new ForbiddenError('Update status to this is not possible');
    }
  }
}
