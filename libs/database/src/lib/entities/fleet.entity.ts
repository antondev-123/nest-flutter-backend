import { OffsetConnection } from '@nestjs-query/query-graphql';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Point } from '../interfaces/point';
import { PolygonTransformer } from '../transformers/polygon.transformer';
import { DriverEntity } from './driver.entity';
import { FleetDeviceEntity } from './fleet-device.entity';
import { FleetTransactionEntity } from './fleet-transaction.entity';
import { FleetWalletEntity } from './fleet-wallet.entity';
import { OperatorEntity } from './operator.entity';
import { RequestEntity } from './request.entity';
import { ZonePriceEntity } from './zone-price.entity';

@Entity('fleet')
export class FleetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('bigint')
  phoneNumber!: string;

  @Column()
  accountNumber!: string;

  @Column('bigint')
  mobileNumber!: string;

  @Column('tinyint', { default: 0 })
  commissionSharePercent!: number;

  @Column('float', { default: 0 })
  commissionShareFlat!: number;

  @Column('varchar', { nullable: true })
  address?: string;

  @Column({
    nullable: true,
  })
  userName?: string;

  @Column({
    nullable: true,
  })
  password?: string;

  @Column('float', {
    precision: 10,
    scale: 2,
    nullable: true,
  })
  feeMultiplier?: number;

  @Column('polygon', {
    transformer: new PolygonTransformer(),
    nullable: true,
  })
  exclusivityAreas?: Point[][];

  @OneToMany(() => DriverEntity, (driver) => driver.fleet)
  drivers!: DriverEntity[];

  @OneToMany(() => FleetWalletEntity, (wallet) => wallet.fleet)
  wallet!: FleetWalletEntity[];

  @OneToMany(
    () => FleetTransactionEntity,
    (fleetTransaction) => fleetTransaction.fleet,
    { onDelete: 'CASCADE', onUpdate: 'RESTRICT' }
  )
  transactions!: FleetTransactionEntity[];

  @OneToMany(() => OperatorEntity, (operator) => operator.fleet)
  operators!: OperatorEntity[];

  @ManyToMany(() => ZonePriceEntity, (zonePrice) => zonePrice.fleets)
  zonePrices!: ZonePriceEntity;

  @OneToMany(() => FleetDeviceEntity, (fleetDevice) => fleetDevice.fleet)
  devices!: FleetDeviceEntity[];

  @OneToMany(() => RequestEntity, (request) => request.fleet)
  requests!: RequestEntity[];
}
