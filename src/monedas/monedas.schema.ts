import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'monedas' })
export class Moneda extends Document {
  @Prop({ required: true, unique: true })
  Id: number;

  @Prop({ required: true })
  nombre: string;
}

export const MonedaSchema = SchemaFactory.createForClass(Moneda);
