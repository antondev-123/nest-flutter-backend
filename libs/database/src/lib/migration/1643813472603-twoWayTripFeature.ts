import {MigrationInterface, QueryRunner} from "typeorm";

export class twoWayTripFeature1643813472603 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`ALTER TABLE service ADD COLUMN twoWayAvailable TINYINT DEFAULT FALSE;`);
        } catch(exception) {}

        try {
            await queryRunner.query(`ALTER TABLE service ADD COLUMN perMinuteWait FLOAT(12,2) DEFAULT 0.00;`);
        } catch(exception) {}

        try {
            await queryRunner.query(`ALTER TABLE request ADD COLUMN waitTime INT DEFAULT 0;`);
        } catch(exception) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
