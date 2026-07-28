import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AnuncioType } from './types/anuncio.type';

@ObjectType()
export class AnunciosResult {
  @Field(() => [AnuncioType])
  anuncios: AnuncioType[];

  @Field(() => Int)
  total: number;
}
