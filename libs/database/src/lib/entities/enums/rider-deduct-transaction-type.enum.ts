import { registerEnumType } from "@nestjs/graphql";

export enum RiderDeductTransactionType {
    OrderFee = 'OrderFee',
    Withdraw = 'Withdraw',
    Correction = 'Correction'
}

registerEnumType(RiderDeductTransactionType, { name: 'RiderDeductTransactionType' });