import { registerEnumType } from "@nestjs/graphql";

export enum DriverDeductTransactionType {
    Withdraw = 'Withdraw',
    Commission = 'Commission',
    Correction = 'Correction'
}

registerEnumType(DriverDeductTransactionType, { name: 'DriverDeductTransactionType' });