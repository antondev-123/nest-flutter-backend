import { registerEnumType } from "@nestjs/graphql";

export enum ProviderDeductTransactionType {
    Withdraw = "Withdraw"
}

registerEnumType(ProviderDeductTransactionType, { name: 'ProviderDeductTransactionType' });