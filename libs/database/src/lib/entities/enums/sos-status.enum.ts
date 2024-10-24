import { registerEnumType } from "@nestjs/graphql";

export enum SOSStatus {
    Submitted = 'Submitted',
    UnderReview = 'UnderReview',
    FalseAlarm = 'FalseAlarm',
    Resolved = 'Resolved'
}

registerEnumType(SOSStatus, { name: 'SOSStatus' });