import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin_wallet')
export class ProviderWalletEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('float', {
        default: 0.0,
        name: 'amount'
    })
    balance!: number;

    @Column()
    currency!: string;
}