import {MigrationInterface, QueryRunner} from "typeorm";

export class paymentGatewayImage1649159946412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`ALTER TABLE payment_gateway ADD COLUMN mediaId INT NULL;`);
            await queryRunner.query('ALTER TABLE payment_gateway ADD FOREIGN KEY (mediaId) REFERENCES media(id);');
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
