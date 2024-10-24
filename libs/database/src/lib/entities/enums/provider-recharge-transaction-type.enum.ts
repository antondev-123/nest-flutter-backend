import { registerEnumType } from "@nestjs/graphql";

export enum ProviderRechargeTransactionType {
    Commission = "Commission"
}

registerEnumType(ProviderRechargeTransactionType, { name: 'ProviderRechargeTransactionType' });