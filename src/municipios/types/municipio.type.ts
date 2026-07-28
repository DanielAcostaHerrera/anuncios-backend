import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MunicipioType {
  @Field(() => Int)
  Id: number;

  @Field()
  nombre: string;

  @Field(() => Int)
  IdProvincia: number;
}
