import { MigrationInterface, QueryRunner } from 'typeorm';

export class usernamePasswordNullable1681500830320
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE `fleet` MODIFY COLUMN `userName` VARCHAR(500) NULL'
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        'ALTER TABLE `fleet` MODIFY COLUMN `password` VARCHAR(500) NULL'
      );
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE `fleet` MODIFY COLUMN `userName` VARCHAR(500) NOT NULL'
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        'ALTER TABLE `fleet` MODIFY COLUMN `password` VARCHAR(500) NOT NULL'
      );
    } catch (error) {}
  }
}
