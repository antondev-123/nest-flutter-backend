import {MigrationInterface, QueryRunner} from "typeorm";

export class orderDirections1656184264310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('ALTER TABLE request ADD COLUMN directions MULTIPOINT;');
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
