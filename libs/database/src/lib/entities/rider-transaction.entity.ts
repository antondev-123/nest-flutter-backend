import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LegacyTransactionType } from './enums/legacy-transaction-type';

import { RiderDeductTransactionType } from './enums/rider-deduct-transaction-type.enum';
import { RiderRechargeTransactionType } from './enums/rider-recharge-transaction-type.enum';
import { TransactionAction } from './enums/transaction-action.enum';
import { TransactionStatus } from './enums/transaction-status.enum';
import { OperatorEntity } from './operator.entity';
import { RequestEntity } from './request.entity';
import { PaymentGatewayEntity } from './payment-gateway.entity';
import { RiderEntity } from './rider-entity';
import { GiftCardEntity } from './gift-card.entity';

@Entity('rider_transaction')
export class RiderTransactionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({name: 'transactionTime'})
    createdAt!: Date;

    @Column('enum', {
        enum: TransactionStatus,
        default: TransactionStatus.Processing
    })
    status!: TransactionStatus;

    @Column('enum', { enum: TransactionAction })
    action!: TransactionAction;

    @Column('enum', {
        enum: RiderDeductTransactionType,
        nullable: true
    })
    deductType?: RiderDeductTransactionType;

    @Column('enum', {
        enum: RiderRechargeTransactionType,
        nullable: true
    })
    rechargeType?: RiderRechargeTransactionType;

    @Column('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    })
    amount!: number;

    @Column('char' , { length: '3'})
    currency!: string;

    @Column({ nullable: true, name: 'documentNumber' })
    refrenceNumber?: string;

    @Column({ nullable: true, name: 'details' })
    description?: string;

    @ManyToOne(() => RiderEntity, rider => rider.transactions)
    rider!: RiderEntity;

    @Column()
    riderId!: number;

    @ManyToOne(() => PaymentGatewayEntity, gateway => gateway.riderTransactions)
    paymentGateway?: PaymentGatewayEntity;

    @Column({ nullable: true })
    paymentGatewayId?: number;

    @ManyToOne(() => OperatorEntity, operator => operator.riderTransactions)
    operator?: OperatorEntity;

    @Column({ nullable: true, name: 'operatorId' })
    operatorId?: number;

    @OneToOne(() => GiftCardEntity, giftCard => giftCard.riderTransaction)
    @JoinColumn()
    giftCard?: GiftCardEntity;

    @Column({nullable: true})
    giftCardId?: number;

    @ManyToOne(() => RequestEntity, order => order.riderTransactions)
    request?: RequestEntity;

    @Column({ nullable: true })
    requestId?: number;
}