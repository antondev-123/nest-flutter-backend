import {MigrationInterface, QueryRunner} from "typeorm";

export class myfatoorahGateway1662795193253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query("ALTER TABLE payment_gateway MODIFY type enum('stripe', 'braintree', 'paypal', 'paytm', 'razorpay', 'paystack', 'payu', 'instamojo', 'flutterwave', 'paygate', 'mips', 'mercadopago', 'amazon', 'mytmoney', 'wayforpay', 'MyFatoorah', 'link') NOT NULL;");
        } catch(error) {}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
