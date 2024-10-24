import { registerEnumType } from "@nestjs/graphql";

export enum ServicePaymentMethod {
    CashCredit = 'CashCredit',
    OnlyCredit = 'OnlyCredit',
    OnlyCash = 'OnlyCash'
}

registerEnumType(ServicePaymentMethod, { name: 'ServicePaymentMethod' });