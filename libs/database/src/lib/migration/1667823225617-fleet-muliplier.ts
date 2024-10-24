import {MigrationInterface, QueryRunner} from "typeorm";

export class FleetMultiplier1667823225617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`ALTER TABLE fleet ADD COLUMN feeMultiplier FLOAT(10,2) NULL;`);
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
