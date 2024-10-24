import { registerEnumType } from "@nestjs/graphql";

export enum DriverRechargeTransactionType {
    OrderFee = 'OrderFee',
    BankTransfer = 'BankTransfer',
    InAppPayment = 'InAppPayment',
    Gift = 'Gift'
}

registerEnumType(DriverRechargeTransactionType, { name: 'DriverRechargeTransactionType' });