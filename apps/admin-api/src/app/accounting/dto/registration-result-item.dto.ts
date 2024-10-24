import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('RegistrationResultItem')
export class RegistrationResultItemDto {
  time: string;
  @Field(() => Int)
  count: number;
}
