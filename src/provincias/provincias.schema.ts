import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'provincias' })
export class Provincia extends Document {
  @Prop({ required: true, unique: true })
  Id: number;

  @Prop({ required: true })
  nombre: string;
}

export const ProvinciaSchema = SchemaFactory.createForClass(Provincia);
