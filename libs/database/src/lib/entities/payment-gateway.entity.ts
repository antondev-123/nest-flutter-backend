import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';
import { RequestEntity } from './request.entity';
import { RiderTransactionEntity } from './rider-transaction.entity';
import { PaymentGatewayType } from './enums/payment-gateway-type.enum';
import { ProviderTransactionEntity } from './provider-transaction.entity';
import { MediaEntity } from './media.entity';
import { GatewayToUserEntity } from './gateway-to-user.entity';

@Entity('payment_gateway')
export class PaymentGatewayEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: true,
  })
  enabled!: boolean;

  @Column()
  title!: string;

  @Column('enum', {
    enum: PaymentGatewayType,
  })
  type!: PaymentGatewayType;

  @Column({
    nullable: true,
    length: 1000,
  })
  publicKey?: string;

  @Column()
  privateKey!: string;

  @Column({ nullable: true })
  saltKey?: string;

  @Column({
    nullable: true,
  })
  merchantId?: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => MediaEntity, (media) => media.paymentGateway, {
    nullable: true,
  })
  @JoinColumn()
  media?: MediaEntity;

  @Column({ nullable: true })
  mediaId?: number;

  @OneToMany(() => RequestEntity, (order) => order.paymentGateway)
  orders?: RequestEntity[];

  @OneToMany(
    () => RiderTransactionEntity,
    (userTransaction) => userTransaction.paymentGateway
  )
  riderTransactions?: RiderTransactionEntity[];

  @OneToMany(
    () => ProviderTransactionEntity,
    (adminTransaction) => adminTransaction.paymentGateway
  )
  adminTransactions?: ProviderTransactionEntity[];

  @OneToMany(
    () => GatewayToUserEntity,
    (gatewayToUser) => gatewayToUser.gateway
  )
  userIds?: GatewayToUserEntity[];
}
