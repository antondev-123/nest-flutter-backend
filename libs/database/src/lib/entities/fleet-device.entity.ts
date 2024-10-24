import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DevicePlatform } from './enums/device-platform.enum';
import { FleetEntity } from './fleet.entity';

@Entity('fleet_device')
export class FleetDeviceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('enum', {
    enum: DevicePlatform,
    nullable: true,
  })
  devicePlatform!: DevicePlatform;

  @Column()
  deviceName!: string;

  @Column()
  ipAddress!: string;

  @Column()
  jwt!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastSeenAt!: Date;

  @Column({ default: false })
  isTerminated!: boolean;

  @ManyToOne(() => FleetEntity, (fleet) => fleet.devices)
  fleet!: FleetEntity;

  @Column()
  fleetId!: number;
}
