import { MigrationInterface, QueryRunner } from 'typeorm';

export class userLastSeenDate1678703202140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE `request` ADD `driverLastSeenMessagesAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP'
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        'ALTER TABLE `request` ADD `riderLastSeenMessagesAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP'
      );
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE `request` DROP COLUMN `driverLastSeenMessagesAt`'
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        'ALTER TABLE `request` DROP COLUMN `riderLastSeenMessagesAt`'
      );
    } catch (error) {}
  }
}
