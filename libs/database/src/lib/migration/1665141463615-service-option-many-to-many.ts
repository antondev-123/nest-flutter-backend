import {MigrationInterface, QueryRunner} from "typeorm";

export class serviceOptionManyToMany1665141463615 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('ALTER TABLE `service_option` DROP COLUMN `serviceId`;');
        } catch(error) {}
        try {
            await queryRunner.query('CREATE TABLE `service_options_service_option` (`serviceId` int NOT NULL, `serviceOptionId` int NOT NULL, PRIMARY KEY (`serviceId`,`serviceOptionId`), FOREIGN KEY (`serviceOptionId`) REFERENCES `service_option` (`id`), FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);')
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
