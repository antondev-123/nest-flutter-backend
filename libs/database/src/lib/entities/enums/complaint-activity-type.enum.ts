import { registerEnumType } from "@nestjs/graphql";

export enum ComplaintActivityType {
    AssignToOperator = 'AssignedToOperator',
    Update = 'Update',
    Resolved = 'Resolved',
}

registerEnumType(ComplaintActivityType, { name: 'ComplaintActivityType' });