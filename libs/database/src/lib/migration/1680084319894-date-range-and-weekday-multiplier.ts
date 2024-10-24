import { MigrationInterface, QueryRunner } from 'typeorm';

export class dateRangeAndWeekdayMultiplier1680084319894
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `ALTER TABLE service ADD COLUMN dateRangeMultipliers TEXT NULL;`
      );
    } catch (exception) {}
    try {
      await queryRunner.query(
        `ALTER TABLE service ADD COLUMN weekdayMultipliers TEXT NULL;`
      );
    } catch (exception) {}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `ALTER TABLE service DROP COLUMN dateRangeMultipliers;`
      );
    } catch (exception) {}
    try {
      await queryRunner.query(
        `ALTER TABLE service DROP COLUMN weekdayMultipliers;`
      );
    } catch (exception) {}
  }
}
