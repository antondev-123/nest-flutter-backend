import { registerEnumType } from "@nestjs/graphql";

export enum RewardAppType {
    Driver = 'Driver',
    Rider = 'Rider'
}

registerEnumType(RewardAppType, { name: 'RewardAppType' });
