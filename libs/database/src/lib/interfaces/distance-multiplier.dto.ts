import { InputType, ObjectType } from "@nestjs/graphql";

@InputType('DistanceMultiplierInput')
@ObjectType()
export class DistanceMultiplier {
    distanceFrom!: number;
    distanceTo!: number;
    multiply!: number;
}