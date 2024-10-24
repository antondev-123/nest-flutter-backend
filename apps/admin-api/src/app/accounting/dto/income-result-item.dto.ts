import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomeResultItem {
  time: string;
  sum: number;
  currency: string;
}
