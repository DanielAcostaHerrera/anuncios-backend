import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProvinciaType {
  @Field(() => Int)
  Id: number;

  @Field()
  nombre: string;
}
