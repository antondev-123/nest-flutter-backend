import { registerEnumType } from "@nestjs/graphql";

export enum TransactionAction {
    Recharge = "Recharge",
    Deduct = "Deduct"
}

registerEnumType(TransactionAction, { name: 'TransactionAction' });