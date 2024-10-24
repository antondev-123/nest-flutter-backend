import { MigrationInterface, QueryRunner } from 'typeorm';

export class preauth1671535821585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `alter table payment modify status enum('processing', 'authorized', 'success', 'canceled', 'failed') default 'processing' not null;`
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        `alter table payment ADD COLUMN externalReferenceNumber text NULL`
      );
    } catch (err) {}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `alter table payment modify status enum('processing', 'success', 'canceled', 'failed') default 'processing' not null;`
      );
    } catch (error) {}
    try {
      await queryRunner.query(
        'alter table payment drop column externalReferenceNumber'
      );
    } catch (error) {}
  }
}
