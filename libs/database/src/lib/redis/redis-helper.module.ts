import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DriverTransactionEntity } from "@ridy/database/driver-transaction.entity";
import { DriverWalletEntity } from "@ridy/database/driver-wallet.entity";
import { DriverEntity } from "@ridy/database/driver.entity";
import { SharedDriverService } from "@ridy/order/shared-driver.service";
import { DriverRedisService } from "./driver-redis.service";
import { OrderRedisService } from "./order-redis.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([DriverEntity, DriverWalletEntity, DriverTransactionEntity])
    ],
    providers: [DriverRedisService, OrderRedisService, SharedDriverService],
    exports: [DriverRedisService, OrderRedisService]
})
export class RedisHelpersModule {}