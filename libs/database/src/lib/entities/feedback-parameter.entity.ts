import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { FeedbackEntity } from "./feedback.entity";

@Entity('review_parameter')
export class FeedbackParameterEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    isGood!: boolean;

    @ManyToMany(() => FeedbackEntity, feedback => feedback.parameters)
    @JoinTable()
    feedbacks!: FeedbackEntity[];
}