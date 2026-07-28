import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'municipios' })
export class Municipio extends Document {
  @Prop({ required: true, unique: true })
  Id: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  provinciaId: number; // 🔹 clave para filtrar
}

export const MunicipioSchema = SchemaFactory.createForClass(Municipio);
