import { registerEnumType } from "@nestjs/graphql";

export enum RiderStatus {
    Enabled = 'enabled',
    Disabled = 'blocked'
}
registerEnumType(RiderStatus, { name: 'RiderStatus'});