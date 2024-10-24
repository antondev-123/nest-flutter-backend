import {MigrationInterface, QueryRunner} from "typeorm";

export class paymentGatewayTypes1648804740118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`ALTER TABLE payment_gateway MODIFY COLUMN type enum('stripe','braintree','paypal','paytm','razorpay','paystack','payu','instamojo','flutterwave','paygate','mips','mercadopago','amazon','mytmoney','wayforpay','link') NOT NULL;`)
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
