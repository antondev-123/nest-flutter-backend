import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequestActivityType } from "./enums/request-activity-type.enum";
import { RequestEntity } from "./request.entity";

@Entity('request_activity')
export class RequestActivityEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('enum', {
        enum: RequestActivityType
    })
    type!: RequestActivityType;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => RequestEntity, (request) => request.activities)
    request!: RequestEntity;

    @Column()
    requestId!: number;
}