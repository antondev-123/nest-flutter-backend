import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RewardAppType } from "./enums/reward-app-type";
import { RewardBeneficiary } from "./enums/reward-beneficiary";
import { RewardEvent } from "./enums/reward-event";

@Entity('reward')
export class RewardEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({
        nullable: true
    })
    startDate?: Date;

    @Column({
        nullable: true
    })
    endDate?: Date;

    @Column('enum', {
        enum: RewardAppType
    })
    appType!: RewardAppType;

    @Column('enum', {
        enum: RewardBeneficiary
    })
    beneficiary!: RewardBeneficiary;

    @Column('enum', {
        enum: RewardEvent
    })
    event!: RewardEvent;

    @Column('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    })
    creditGift!: number;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column('int', { nullable: true })
    tripFeePercentGift?: number;

    @Column('char', { length: 3, nullable: true })
    creditCurrency?: string;

    @Column('int', { nullable: true })
    conditionTripCountsLessThan?: number;

    @Column('simple-array', { nullable: true })
    conditionUserNumberFirstDigits?: string[];
}