import { registerEnumType } from "@nestjs/graphql";

export enum ComplaintStatus {
    Submitted = 'Submitted',
    UnderInvestigation = 'UnderInvestigation', 
    Resolved = 'Resolved'
}

registerEnumType(ComplaintStatus, { name: 'ComplaintStatus'});