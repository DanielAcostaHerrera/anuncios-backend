import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CategoriaType {
  @Field(() => Int)
  Id: number;

  @Field()
  nombre: string;
}
