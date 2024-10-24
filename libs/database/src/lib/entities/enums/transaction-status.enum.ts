import { registerEnumType } from "@nestjs/graphql";

export enum TransactionStatus {
    Processing = "Processing",
    Done = "Done",
    Canceled = "Canceled",
    Rejected = "Rejected"
    
}

registerEnumType(TransactionStatus, { name: 'TransactionStatus' });