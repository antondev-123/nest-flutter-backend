import {MigrationInterface, QueryRunner} from "typeorm";

export class versionTwoFeatures1650734742695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('ALTER TABLE `service` ADD COLUMN description VARCHAR(255) NULL;');
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE `service` ADD COLUMN personCapacity SMALLINT NULL;');
        } catch(error) {}
        try {
            await queryRunner.query('CREATE TABLE `gift_card` (id INT PRIMARY KEY AUTO_INCREMENT, code VARCHAR(255) NOT NULL, currency CHAR(3) NOT NULL, amount FLOAT(10, 2) NOT NULL, isUsed tinyint(1) NOT NULL DEFAULT FALSE, availableTimestamp DATETIME NULL, expirationTimestamp DATETIME NULL, riderTransactionId INT NULL, FOREIGN KEY (riderTransactionId) REFERENCES rider_transaction(id));');
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE `request` ADD COLUMN waitMinutes SMALLINT NOT NULL DEFAULT 0;');
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE `request` ADD COLUMN tipAmount FLOAT(10,2) NOT NULL DEFAULT 0;');
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE `promotion` ADD COLUMN url VARCHAR(1500) NULL;');
        } catch(error) {}
        try {
            await queryRunner.query("ALTER TABLE `rider_address` MODIFY type ENUM ('Home', 'Work', 'Partner', 'Other', 'Gym', 'Parent', 'Park', 'Cafe') DEFAULT 'Other' NOT NULL;");
        } catch(error) {}
        try {
            await queryRunner.query('ALTER TABLE `driver` ADD COLUMN searchDistance int NULL;');
        } catch(error) {}
        try {
            await queryRunner.query("CREATE TABLE `service_option` (id INT PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, type ENUM ('TwoWay', 'Free', 'Paid') NOT NULL, additionalFee INT NULL, icon ENUM('Pet', 'TwoWay', 'Luggage', 'PackageDelivery', 'Shopping', 'Custom1', 'Custom2', 'Custom3', 'Custom4', 'Custom5') NOT NULL, serviceId INT NOT NULL, FOREIGN KEY (serviceId) REFERENCES service(id) ON DELETE CASCADE);");
        } catch(error) {}
        try {
            await queryRunner.query("CREATE TABLE `request_options_service_option` (`requestId` int NOT NULL, `serviceOptionId` int NOT NULL, PRIMARY KEY (`requestId`,`serviceOptionId`), FOREIGN KEY (`requestId`) REFERENCES `request` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (`serviceOptionId`) REFERENCES `service_option` (`id`));")
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
