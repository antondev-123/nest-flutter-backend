import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "../interfaces/point";
import { PointTransformer } from "../transformers/point.transformer";
import { SOSStatus } from "./enums/sos-status.enum";
import { RequestEntity } from "./request.entity";
import { SOSActivityEntity } from "./sos-activity.entity";



@Entity('sos')
export class SOSEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @Column('enum', {
        enum: SOSStatus,
        default: SOSStatus.Submitted
    })
    status!: SOSStatus;

    @Column('point', {
        transformer: new PointTransformer(),
        nullable: true
    })
    location?: Point;

    @ManyToOne(() => RequestEntity, request => request.sosCalls)
    request!: RequestEntity;

    @Column()
    requestId!: number;

    @Column()
    submittedByRider!: boolean;

    @OneToMany(() => SOSActivityEntity, activity => activity.sos)
    activities!: SOSActivityEntity[];
}