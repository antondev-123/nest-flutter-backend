import { MigrationInterface, QueryRunner } from 'typeorm';

export class preauthV21672644387795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE payment ADD COLUMN orderNumber varchar(255);'
      );
    } catch (error) {
      try {
        await queryRunner.query(
          'CREATE INDEX `INDEX_ORDER_NUMBER` ON `payment` (`orderNumber`);'
        );
      } catch (error) {}
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
