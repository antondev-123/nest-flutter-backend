import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "../interfaces/point";
import { PointTransformer } from "../transformers/point.transformer";
import { RiderAddressType } from "./enums/rider-address-type.enum";
import { RiderEntity } from "./rider-entity";

@Entity('rider_address')
export class RiderAddressEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('enum', {
        enum: RiderAddressType,
        default: RiderAddressType.Other
    })
    type!: RiderAddressType;

    @Column()
    title!: string;

    @Column({ nullable: true, name: 'address' })
    details?: string;

    @Column('point', {
        transformer: new PointTransformer()
    })
    location!: Point;



    @ManyToOne(() => RiderEntity, rider => rider.addresses)
    rider!: RiderEntity;

    @Column()
    riderId!: number;
}