import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceEntity } from "./service.entity";

@Entity('service_category')
export class ServiceCategoryEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'title'})
    name!: string;

    @OneToMany(() => ServiceEntity, service => service.category)
    services!: ServiceEntity[];

    @DeleteDateColumn()
    deletedAt?: Date;
}