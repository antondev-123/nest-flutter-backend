import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequestEntity } from "./request.entity";
import { RiderEntity } from "./rider-entity";
import { ServiceEntity } from "./service.entity";

@Entity('coupon')
export class CouponEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    code!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({
        default: 0
    })
    manyUsersCanUse!: number;

    @Column({
        default: 1
    })
    manyTimesUserCanUse!: number;

    @Column("float", {
        default: '0.00',
        precision: 10,
        scale: 2
    })
    minimumCost!: number;

    @Column("float", {
        default: '0.00',
        precision: 10,
        scale: 2
    })
    maximumCost!: number;

    @Column({name: 'startTimestamp'})
    startAt!: Date;

    @Column({name: 'expirationTimestamp', nullable: true })
    expireAt?: Date;

    @Column("tinyint", {
        default: 0
    })
    discountPercent!: number;

    @Column("float", {
        default: 0,
        precision: 10,
        scale: 2
    })
    discountFlat!: number;

    @Column("float", {
        default: 0,
        precision: 10,
        scale: 2
    })
    creditGift!: number;

    @Column({
        default: true
    })
    isEnabled!: boolean;

    @Column({
        default: false
    })
    isFirstTravelOnly!: boolean;

    @ManyToMany(() => ServiceEntity, service => service.allowedCoupons)
    @JoinTable({ name: 'coupon_services_service' })
    allowedServices!: ServiceEntity[];

    @ManyToMany(() => RiderEntity, rider => rider.coupons)
    riders!: RiderEntity[];

    @OneToMany(() => RequestEntity, order => order.coupon, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
    orders!: RequestEntity[];
}