import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FleetEntity } from './fleet.entity';

@Entity('fleet_wallet')
export class FleetWalletEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('float', {
        default: 0.0,
        name: 'amount'
    })
    balance!: number;

    @Column()
    currency!: string;

    @ManyToOne(() => FleetEntity, fleet => fleet.wallet)
    fleet!: FleetEntity;

    @Column()
    fleetId!: number;
}