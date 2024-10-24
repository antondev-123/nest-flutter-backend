import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('FeedbackParameterAggregate')
export class FeedbackParameterAggregateDto {
  @Field(() => ID)
  count: number;
  title: string;
  isGood: boolean;
}
