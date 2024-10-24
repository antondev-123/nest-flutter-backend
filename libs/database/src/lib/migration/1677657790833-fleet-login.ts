import { MigrationInterface, QueryRunner } from 'typeorm';

export class fleetLogin1677657790833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE `fleet` ADD `userName` varchar(255) NOT NULL'
      );
      await queryRunner.query(
        'ALTER TABLE `fleet` ADD `password` varchar(255) NOT NULL'
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        'ALTER TABLE `fleet` ADD UNIQUE INDEX `IDX_8d1e1b0e8f0b0b1e9b1c8c8a5e` (`userName`)'
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        "CREATE TABLE `fleet_device` (`id` int NOT NULL AUTO_INCREMENT, `devicePlatform` enum ('ANDROID', 'IOS', 'WEB', 'MACOS', 'WINDOWS', 'LINUX') NULL, `deviceName` varchar(255) NOT NULL, `ipAddress` varchar(255) NOT NULL, `jwt` varchar(255) NOT NULL, `lastSeenAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `isTerminated` tinyint NOT NULL DEFAULT 0, `fleeetId` int NOT NULL, PRIMARY KEY (`id`))"
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        'ALTER TABLE `fleet_device` ADD CONSTRAINT `FK_ab48871aed3c43fbeb2411eb8c0` FOREIGN KEY (`fleetId`) REFERENCES `fleet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
      );
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
