import { MigrationInterface, QueryRunner } from 'typeorm';

export class operatorNotificationSetting1678355979780
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      queryRunner.query(
        "ALTER TABLE `operator` ADD COLUMN `enabledNotifications` SET('sos','complaint','order','driverSubmittedDocs') NOT NULL DEFAULT 'sos,complaint,driverSubmittedDocs'"
      );
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      queryRunner.query(
        'ALTER TABLE `operator` DROP COLUMN `enabledNotifications`'
      );
    } catch (error) {}
  }
}
