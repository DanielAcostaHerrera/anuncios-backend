import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { CrearAnuncioInput } from './crear-anuncio.input';

@InputType()
export class ActualizarAnuncioInput extends PartialType(CrearAnuncioInput) {
  @Field(() => Int)
  Id: number;

  @Field({ nullable: true })
  Fotos?: string;

  @Field({ nullable: true })
  Titulo?: string;

  @Field(() => Float, { nullable: true })
  Precio?: number;

  @Field(() => Int, { nullable: true })
  Moneda?: number;

  @Field({ nullable: true })
  Descripcion?: string;

  @Field(() => Int, { nullable: true })
  Categoria?: number;

  @Field(() => Int, { nullable: true })
  IdSubcategoria?: number;

  @Field(() => Int, { nullable: true })
  Provincia?: number;

  @Field(() => Int, { nullable: true })
  Municipio?: number;

  @Field({ nullable: true })
  Celular?: string;

  @Field({ nullable: true })
  Fijo?: string;

  @Field({ nullable: true })
  FechaActualizacion?: Date;
}
