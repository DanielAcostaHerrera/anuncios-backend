import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MonedaType {
  @Field(() => Int)
  Id: number;

  @Field()
  nombre: string;
}
