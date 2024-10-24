import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RiderEntity } from "./rider-entity";

@Entity('rider_wallet')
export class RiderWalletEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('float', {
        default: 0.0,
        name: 'amount'
    })
    balance!: number;

    @Column('char', { length: 3 })
    currency!: string;

    @ManyToOne(() => RiderEntity, rider => rider.wallets)
    rider!: RiderEntity;

    @Column()
    riderId!: number;
}