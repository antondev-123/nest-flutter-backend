import { InputType, ObjectType } from "@nestjs/graphql";

@InputType('TimeMultiplierInput')
@ObjectType()
export class TimeMultiplier {
    startTime!: string;
    endTime!: string;
    multiply!: number;
}