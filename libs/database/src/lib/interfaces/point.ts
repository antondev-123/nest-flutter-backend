import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
@InputType('PointInput')
export class Point {
  @Field(() => Float)
  lat!: number;
  
  @Field(() => Float)
  lng!: number;
}
