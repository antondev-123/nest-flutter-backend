import { registerEnumType } from "@nestjs/graphql";

export enum RiderRechargeTransactionType {
    BankTransfer = 'BankTransfer',
    Gift = 'Gift',
    Correction = 'Correction',
    InAppPayment = 'InAppPayment'
}

registerEnumType(RiderRechargeTransactionType, { name: 'RiderRechargeTransactionType'});