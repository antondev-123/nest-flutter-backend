import {MigrationInterface, QueryRunner} from "typeorm";

export class userDeleteFeature1659110581464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('ALTER TABLE rider ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE driver ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
