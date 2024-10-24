import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ComplaintEntity } from "./complaint.entity";
import { ComplaintActivityType } from "./enums/complaint-activity-type.enum";
import { OperatorEntity } from "./operator.entity";

@Entity('complaint_activity')
export class ComplaintActivityEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('enum', {
        enum: ComplaintActivityType
    })
    type!: ComplaintActivityType;

    @ManyToOne(() => OperatorEntity, operator => operator.complaintActivities)
    actor!: OperatorEntity;

    actorId!: string;

    @ManyToOne(() => OperatorEntity)
    assignedTo?: OperatorEntity;

    @Column({ nullable: true })
    assignedToId?: number;

    @Column({ nullable: true })
    comment?: string;

    @ManyToOne(() => ComplaintEntity, complaint => complaint.activities)
    complaint!: ComplaintEntity;

    @Column()
    complaintId!: number;

}