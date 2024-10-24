import { MigrationInterface, QueryRunner } from "typeorm";

export class addressLength1669317100250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('ALTER TABLE request MODIFY addresses TEXT NOT NULL;');
        } catch (error) { }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
