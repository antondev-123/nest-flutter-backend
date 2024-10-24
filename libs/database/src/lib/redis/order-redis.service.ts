import { Injectable } from '@nestjs/common';
import { RequestEntity } from '../entities/request.entity';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { SharedDriverService } from '@ridy/order/shared-driver.service';
import { DriverEntity } from '@ridy/database/driver.entity';

@Injectable()
export class OrderRedisService {
  constructor(
    @InjectRedis() private readonly redisService: Redis,
    private sharedDriverService: SharedDriverService
  ) {}

  async add(
    request: RequestRedisDTO,
    minutesfromNow: number
  ): Promise<RequestRedisDTO> {
    const date = new Date();
    const pickupTime = date.setMinutes(date.getMinutes() + minutesfromNow);
    await this.redisService.geoadd(
      RedisKeys.Request,
      request.points[0].lng,
      request.points[0].lat,
      request.id.toString()
    );
    await this.redisService.zadd(RedisKeys.RequestTime, pickupTime, request.id);
    // await this.redisService.set(`${RedisKeys.Request}:${request.id}`, JSON.stringify(request));
    return request;
  }

  async getForDriver(driverId: number, distance?: number): Promise<string[]> {
    const driverLocation = await this.redisService.geopos(
      RedisKeys.Driver,
      driverId.toString()
    );
    if (driverLocation[0] == null) {
      return [];
    }
    const searchArea =
      distance ??
      (await this.sharedDriverService.getMaxRadiusForDriverServices(driverId));
    const requestIds = await this.redisService.georadius(
      RedisKeys.Request,
      parseFloat(driverLocation[0][0]),
      parseFloat(driverLocation[0][1]),
      searchArea,
      'm'
    );
    // const requests = [];
    const ts = Math.round(new Date().getTime());
    const min = ts - 20 * 60000;
    const max = ts + 30 * 60000;
    const _requests = await this.redisService.zrangebyscore(
      RedisKeys.RequestTime,
      min,
      max
    );
    const intersection = requestIds.filter((x) =>
      _requests.includes(x as string)
    );
    return intersection.map((x) => (x as any).toString());
    // for (const requestId of intersection) {
    //     const requestString = await this.redisService.get(`${RedisKeys.Request}:${requestId}`);
    //     const request: RequestRedisDTO = JSON.parse(requestString!);

    //     if (request) {
    //         const canDo = await this.sharedDriverService.canDriverDoServiceAndFleet(driverId, request.serviceId, request.fleetIds);
    //         if(canDo) {
    //             requests.push(request);
    //         }
    //     }
    // }
    // return requests;
  }

  async driverNotified(requestId: number, driverIds: DriverEntity[]) {
    const ids = driverIds.map((driverId) => driverId.id);
    for (let id of ids) {
      await this.redisService.sadd(
        `${RedisKeys.RequestDrivers}:${requestId}`,
        id
      );
    }
  }

  async getDriversNotified(requestId: number): Promise<Array<number>> {
    const driverIds = await this.redisService.smembers(
      `${RedisKeys.RequestDrivers}:${requestId}`
    );
    return driverIds.map((x: string) => parseInt(x));
  }

  async expire(requestIds: number[]) {
    for (const requestId of requestIds) {
      await this.redisService.zrem(RedisKeys.Request, requestId);
      await this.redisService.zrem(RedisKeys.RequestTime, requestId);
      const driversNotified = await this.getDriversNotified(requestId);
      for (let driver of driversNotified) {
        await this.redisService.srem(
          `${RedisKeys.RequestDrivers}:${requestId}`,
          driver
        );
      }
      this.redisService.del(`${RedisKeys.Request}:${requestId}`);
    }
    //this.redisService.del(requestIds.map(id => (`${RedisKeys.Request}:${id}`)).join(' ')); // # This doesn't works for some reason. expire works
  }

  async getAll(): Promise<string[]> {
    return this.getRequestsInTimeRange(0, -1);
  }

  async getRequestIdsInTimeRage(min: number, max: number) {
    return await this.redisService.zrange(RedisKeys.RequestTime, min, max);
  }

  async getRequestsInTimeRange(min: number, max: number): Promise<string[]> {
    const _requestIds = await this.getRequestIdsInTimeRage(min, max);
    return _requestIds;
    // const result: RequestRedisDTO[] = []
    // for(const requestId of _requestIds) {
    //     const request = await this.getOne(requestId);
    //     if(request != null) {
    //         result.push(request);
    //     }
    // }
    // return result;
  }

  // async getOne(orderId: number | string): Promise<RequestRedisDTO | null> {
  //     const str = await this.redisService.get(`${RedisKeys.Request}:${orderId}`);
  //     if(str == null) return null;
  //     return JSON.parse(str);

  // }
}

enum RedisKeys {
  Driver = 'driver',
  Request = 'request',
  RequestDrivers = 'request-drivers',
  RequestTime = 'request-time',
}

export type RequestRedisDTO = Pick<
  RequestEntity,
  | 'id'
  | 'expectedTimestamp'
  | 'currency'
  | 'addresses'
  | 'points'
  | 'distanceBest'
  | 'durationBest'
  | 'costBest'
  | 'serviceId'
  | 'createdOn'
  | 'status'
> & { fleetIds: number[] };
