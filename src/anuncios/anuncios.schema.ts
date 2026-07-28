import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Anuncios' })
export class Anuncio extends Document {
  @Prop({ required: true, unique: true })
  Id: number;

  @Prop({ type: String, required: false })
  Fotos?: string;

  @Prop({ required: true })
  Titulo: string;

  @Prop({ required: true })
  Precio: number;

  @Prop({ required: true })
  Moneda: number;

  @Prop({ required: true })
  Descripcion: string;

  @Prop({ required: true })
  Categoria: number;

  @Prop({ required: true })
  IdSubcategoria: number; 

  @Prop({ required: true })
  Provincia: number;

  @Prop({ required: true })
  Municipio: number;

  @Prop({ type: String, required: false })
  Celular?: string;

  @Prop({ type: String, required: false })
  Fijo?: string;

  @Prop({ required: true })
  FechaActualizacion: Date;
}

export const AnuncioSchema = SchemaFactory.createForClass(Anuncio);
