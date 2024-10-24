import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentGatewayEntity } from './payment-gateway.entity';

@Entity('gateway_to_user')
export class GatewayToUserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PaymentGatewayEntity, (gateway) => gateway.userIds)
  gateway!: PaymentGatewayEntity;

  @Column()
  gatewayId!: number;

  @Index()
  @Column()
  internalUserId!: string;

  @Column()
  externalReferenceNumber!: string;
}
