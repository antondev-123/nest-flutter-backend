import { InputType, ObjectType, registerEnumType } from '@nestjs/graphql';

@InputType('DateRangeMultiplierInput')
@ObjectType()
export class DateRangeMultiplier {
  startDate!: number;
  endDate!: number;
  multiply!: number;
}
