import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'subcategorias' })
export class Subcategoria extends Document {
  @Prop({ required: true, unique: true })
  Id: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  IdCategoria: number;
}

export const SubcategoriaSchema = SchemaFactory.createForClass(Subcategoria);
