import {MigrationInterface, QueryRunner} from "typeorm";

export class sos1659272213700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query("CREATE TABLE `sos` (`id` int NOT NULL PRIMARY KEY AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `status` enum('Submitted','UnderReview','FalseAlarm','Resolved') NOT NULL DEFAULT 'Submitted', `requestId` int NOT NULL, `location` point DEFAULT NULL, `submittedByRider` tinyint NOT NULL, FOREIGN KEY (`requestId`) REFERENCES `request` (`id`));");
        } catch(error) {}
        try {
            await queryRunner.query("CREATE TABLE `sos_activity` ( `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `action` enum('Submitted','Seen','ContactDriver','ContactAuthorities','MarkedAsResolved','MarkedAsFalseAlarm') NOT NULL, `note` varchar(2000) NOT NULL, `operatorId` int DEFAULT NULL, `sosId` int NOT NULL, FOREIGN KEY (`operatorId`) REFERENCES `operator` (`id`), FOREIGN KEY (`sosId`) REFERENCES `sos` (`id`))");
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
