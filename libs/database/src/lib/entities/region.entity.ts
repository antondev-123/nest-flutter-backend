import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Point } from '../interfaces/point';
import { PolygonTransformer } from '../transformers/polygon.transformer';
import { ServiceEntity } from './service.entity';

@Entity('region')
export class RegionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('char', { length: 3 })
    currency!: string;

    @Column({
        default: true
    })
    enabled!: boolean;

    @Column("polygon", {
        transformer: new PolygonTransformer()
    })
    location!: Point[][];

    @ManyToMany(() => ServiceEntity, service => service.regions)
    services!:ServiceEntity[];
}