import { registerEnumType } from "@nestjs/graphql";

export enum LegacyTransactionType {
    Cash = 'Cash',
    Bank = 'Bank',
    Gift = 'Gift',
    Commission = 'Commission',
    Travel = 'Travel',
    InApp = 'InApp',
    TransferToBank = 'TransferToBank'
}

registerEnumType(LegacyTransactionType, { name: 'LegacyTransactionType' });