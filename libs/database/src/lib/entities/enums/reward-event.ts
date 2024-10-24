import { registerEnumType } from "@nestjs/graphql";

export enum RewardEvent {
    Register = 'Register',
    ServiceCompleted = 'ServiceCompleted'
}

registerEnumType(RewardEvent, { name: 'RewardEvent' });