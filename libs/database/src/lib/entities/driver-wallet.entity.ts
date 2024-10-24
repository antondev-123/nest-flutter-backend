import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";

@Entity('driver_wallet')
export class DriverWalletEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('float', {
        default: 0.0,
        name: 'amount'
    })
    balance!: number;

    @Column('char', { length: 3 })
    currency!: string;

    @ManyToOne(() => DriverEntity, driver => driver.wallet, { onDelete: 'CASCADE' })
    driver!: DriverEntity;

    @Column()
    driverId!: number;
}