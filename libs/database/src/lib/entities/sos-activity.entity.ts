import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SOSActivityAction } from "./enums/sos-activity-action.enum";
import { OperatorEntity } from "./operator.entity";
import { SOSEntity } from "./sos.entity";

@Entity('sos_activity')
export class SOSActivityEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @Column('enum', {
        enum: SOSActivityAction,
    })
    action!: SOSActivityAction;

    @Column({
        length: 2000
    })
    note?: string;

    @ManyToOne(() => OperatorEntity, operator => operator.sosActivities)
    operator?: OperatorEntity;
    
    @Column({nullable: true})
    operatorId?: number;

    @ManyToOne(() => SOSEntity, sos => sos.activities)
    sos!: SOSEntity;

    @Column()
    sosId!: number;
}