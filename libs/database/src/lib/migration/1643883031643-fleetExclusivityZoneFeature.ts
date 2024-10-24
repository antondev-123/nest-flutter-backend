import {MigrationInterface, QueryRunner} from "typeorm";

export class fleetExclusivityZoneFeature1643883031643 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`ALTER TABLE fleet ADD COLUMN exclusivityAreas POLYGON NULL;`);
        } catch(exception) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
