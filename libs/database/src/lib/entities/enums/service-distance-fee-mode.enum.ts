import { registerEnumType } from "@nestjs/graphql";

export enum ServiceDistanceFeeMode {
    None = 'None',
    PickupToDestination = 'PickupToDestination',
    Radial = 'Radial'
}

registerEnumType(ServiceDistanceFeeMode, { name: 'ServiceDistanceFeeMode'});