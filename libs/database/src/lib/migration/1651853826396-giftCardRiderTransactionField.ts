import {MigrationInterface, QueryRunner} from "typeorm";

export class giftCardRiderTransactionField1651853826396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('ALTER TABLE rider_transaction ADD COLUMN giftCardId INT NULL;');
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE rider_transaction ADD FOREIGN KEY (giftCardId) REFERENCES gift_card(id);');
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
