import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'categorias' })
export class Categoria extends Document {
  @Prop({ required: true, unique: true })
  Id: number;

  @Prop({ required: true })
  nombre: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
