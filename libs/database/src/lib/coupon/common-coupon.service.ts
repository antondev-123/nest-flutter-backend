import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CouponEntity } from "@ridy/database/coupon.entity";
import { RequestEntity } from "@ridy/database/request.entity";
import { SharedOrderService } from "@ridy/order/shared-order.service";
import { ForbiddenError } from "apollo-server-fastify";
import { Repository } from "typeorm";

@Injectable()
export class CommonCouponService {
    constructor(
        @InjectRepository(CouponEntity)
        private couponRepo: Repository<CouponEntity>,
        @InjectRepository(RequestEntity)
        private requestRepo: Repository<RequestEntity>,
    ) {}

    applyCouponOnPrice(coupon: CouponEntity, price: number): number {
        if (coupon == null) return price;
        return (price * ((100 - coupon.discountPercent) / 100)) - coupon.discountFlat;
    }

    async checkCoupon(code: string, riderId?: number): Promise<CouponEntity> {
        const coupon = await this.couponRepo.findOne({ code });
        if (coupon == null) {
            throw new ForbiddenError('Incorrect code');
        }
        if (coupon.expireAt == null || coupon.expireAt < new Date()) {
            throw new ForbiddenError('Coupon expired');
        }
        if (riderId != null) {
            const requestsWithCoupon = await this.requestRepo.count({ where: { riderId, couponId: coupon.id } });
            if (requestsWithCoupon >= coupon.manyTimesUserCanUse) {
                throw new ForbiddenError('Coupon already used.');
            }
        }

        if (!coupon.isEnabled) {
            throw new ForbiddenError('Coupon is disabled.');
        }
        const timesCouponUsed = await this.requestRepo.count({ couponId: coupon.id });
        if (timesCouponUsed >= coupon.manyUsersCanUse) {
            throw new ForbiddenError('Coupon usage limit exceeded.');
        }
        return coupon;
    }

    async applyCoupon(code: string, orderId: number,riderId: number): Promise<RequestEntity> {
        const coupon = await this.checkCoupon(code, riderId);
        let request = await this.requestRepo.findOneOrFail(orderId, { relations: ['service']});
        const finalCost = this.applyCouponOnPrice(coupon, (request.costBest + request.waitMinutes * request.service.perMinuteWait));
        await this.requestRepo.update(request.id, { couponId: coupon.id, costAfterCoupon: finalCost });
        request = await this.requestRepo.findOneOrFail(orderId, { relations: ['service']});
        return request;
    }
}