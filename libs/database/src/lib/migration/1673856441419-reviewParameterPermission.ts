import { MigrationInterface, QueryRunner } from 'typeorm';

export class reviewParameterPermission1673856441419
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      queryRunner.query(
        "ALTER TABLE `ridy`.`operator_role` CHANGE COLUMN `permissions` `permissions` SET('Drivers_View', 'Drivers_Edit', 'Riders_View', 'Riders_Edit', 'Regions_View', 'Regions_Edit', 'Services_View', 'Services_Edit', 'Complaints_View', 'Complaints_Edit', 'Coupons_View', 'Coupons_Edit', 'Announcements_View', 'Announcements_Edit', 'Requests_View', 'Fleets_View', 'Fleets_Edit', 'Gateways_View', 'Gateways_Edit', 'Users_View', 'Users_Edit', 'Cars_View', 'Cars_Edit', 'FleetWallet_View', 'FleetWallet_Edit', 'ProviderWallet_View', 'ProviderWallet_Edit', 'DriverWallet_View', 'DriverWallet_Edit', 'RiderWallet_View', 'RiderWallet_Edit', 'ReviewParameter_Edit') NOT NULL;"
      );
    } catch (error) {}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      queryRunner.query(
        "ALTER TABLE `ridy`.`operator_role` CHANGE COLUMN `permissions` `permissions` SET('Drivers_View', 'Drivers_Edit', 'Riders_View', 'Riders_Edit', 'Regions_View', 'Regions_Edit', 'Services_View', 'Services_Edit', 'Complaints_View', 'Complaints_Edit', 'Coupons_View', 'Coupons_Edit', 'Announcements_View', 'Announcements_Edit', 'Requests_View', 'Fleets_View', 'Fleets_Edit', 'Gateways_View', 'Gateways_Edit', 'Users_View', 'Users_Edit', 'Cars_View', 'Cars_Edit', 'FleetWallet_View', 'FleetWallet_Edit', 'ProviderWallet_View', 'ProviderWallet_Edit', 'DriverWallet_View', 'DriverWallet_Edit', 'RiderWallet_View', 'RiderWallet_Edit') NOT NULL;"
      );
    } catch (error) {}
  }
}
