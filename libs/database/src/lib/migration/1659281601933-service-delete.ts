import {MigrationInterface, QueryRunner} from "typeorm";

export class serviceDelete1659281601933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('ALTER TABLE service ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE service_category ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE payment_gateway ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
