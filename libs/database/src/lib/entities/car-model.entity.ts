import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";

@Entity('car')
export class CarModelEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'title'})
    name!: string;

    @OneToMany(() => DriverEntity, driver => driver.car)
    drivers!: DriverEntity[];
}