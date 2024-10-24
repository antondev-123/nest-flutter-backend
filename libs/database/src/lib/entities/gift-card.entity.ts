import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RiderTransactionEntity } from "./rider-transaction.entity";

@Entity('gift_card')
export class GiftCardEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    code!: string;
    
    @Column('varchar', {
        length: 3
    })
    currency!: string;

    @Column('float', {
        precision: 10,
        scale: 2
    })
    amount!: number;

    @Column()
    isUsed!: boolean;

    @Column()
    availableTimestamp?: Date;

    @Column()
    expirationTimestamp?: Date;

    @OneToOne(() => RiderTransactionEntity, riderTransaction => riderTransaction.giftCard)
    riderTransaction?: RiderTransactionEntity;
}