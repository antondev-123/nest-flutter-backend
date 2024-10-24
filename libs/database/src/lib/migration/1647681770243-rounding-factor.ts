import {MigrationInterface, QueryRunner} from "typeorm";

export class roundingFactor1647681770243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            return await queryRunner.query(`ALTER TABLE service ADD COLUMN roundingFactor FLOAT(10,2) NULL;`);
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
