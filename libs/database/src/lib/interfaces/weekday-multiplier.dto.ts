import { InputType, ObjectType, registerEnumType } from '@nestjs/graphql';

@InputType('WeekdayMultiplierInput')
@ObjectType()
export class WeekdayMultiplier {
  weekday!: Weekday;
  multiply!: number;
}

export enum Weekday {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

registerEnumType(Weekday, {
  name: 'Weekday',
});
