import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SubcategoriaType {
  @Field(() => Int)
  Id: number;

  @Field()
  nombre: string;

  @Field(() => Int)
  IdCategoria: number;
}
