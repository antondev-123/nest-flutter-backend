import {MigrationInterface, QueryRunner} from "typeorm";

export class sberbankGateway1664015936540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE payment_gateway MODIFY type enum('stripe', 'braintree', 'paypal', 'paytm', 'razorpay', 'paystack', 'payu', 'instamojo', 'flutterwave', 'paygate', 'mips', 'mercadopago', 'amazon', 'mytmoney', 'wayforpay', 'MyFatoorah', 'SberBank', 'link') NOT NULL;");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
