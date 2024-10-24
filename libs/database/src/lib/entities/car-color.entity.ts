import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";

@Entity('car_color')
export class CarColorEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => DriverEntity, driver => driver.carColor)
    drivers!: DriverEntity[];
}