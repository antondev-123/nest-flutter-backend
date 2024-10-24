import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";
import { DriverDeductTransactionType } from "./enums/driver-deduct-transaction-type.enum";
import { DriverRechargeTransactionType } from "./enums/driver-recharge-transaction-type.enum";
import { TransactionAction } from "./enums/transaction-action.enum";
import { TransactionStatus } from "./enums/transaction-status.enum";
import { OperatorEntity } from "./operator.entity";
import { RequestEntity } from "./request.entity";
import { PaymentGatewayEntity } from "./payment-gateway.entity";

@Entity('driver_transaction')
export class DriverTransactionEntity {
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
        enum: DriverDeductTransactionType,
        nullable: true
    })
    deductType?: DriverDeductTransactionType;

    @Column('enum', {
        enum: DriverRechargeTransactionType,
        nullable: true
    })
    rechargeType?: DriverRechargeTransactionType;

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

    @ManyToOne(() => DriverEntity, driver => driver.transactions)
    driver!: DriverEntity;

    @Column()
    driverId!: number;

    @ManyToOne(() => PaymentGatewayEntity, gateway => gateway.riderTransactions)
    paymentGateway?: PaymentGatewayEntity;

    @Column({ nullable: true })
    paymentGatewayId?: number;

    @ManyToOne(() => OperatorEntity, operator => operator.driverTransactions)
    operator?: OperatorEntity;

    @Column({ nullable: true })
    operatorId?: number;

    @ManyToOne(() => RequestEntity, order => order.driverTransactions)
    request?: RequestEntity;

    @Column({ nullable: true })
    requestId?: number;
}