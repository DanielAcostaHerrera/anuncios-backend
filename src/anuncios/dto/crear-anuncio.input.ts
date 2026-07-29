import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CrearAnuncioInput {
  @Field({ nullable: true })
  Fotos?: string;

  @Field()
  Titulo: string;

  @Field(() => Float)
  Precio: number;

  @Field(() => Int)
  Moneda: number;

  @Field()
  Descripcion: string;

  @Field(() => Int)
  Categoria: number;

  @Field(() => Int)
  IdSubcategoria: number;

  @Field(() => Int)
  Provincia: number;

  @Field(() => Int)
  Municipio: number;

  @Field({ nullable: true })
  NombreAnunciante?: string;

  @Field({ nullable: true })
  Celular?: string;

  @Field({ nullable: true })
  Fijo?: string;

  @Field()
  FechaActualizacion: Date;
}
