import { registerEnumType } from "@nestjs/graphql";

export enum RewardBeneficiary {
    Self = 'Self',
    Referrer = 'Referrer'
}

registerEnumType(RewardBeneficiary, { name: 'RewardBeneficiary' });
