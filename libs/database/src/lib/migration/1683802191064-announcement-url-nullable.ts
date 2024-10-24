import { MigrationInterface, QueryRunner } from 'typeorm';

export class announcementUrlNullable1683802191064
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE `promotion` MODIFY COLUMN `url` VARCHAR(500) NULL'
      );
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE `promotion` MODIFY COLUMN `url` VARCHAR(500) NOT NULL'
      );
    } catch (error) {}
  }
}
