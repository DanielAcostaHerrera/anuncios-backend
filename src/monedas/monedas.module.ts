import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonedasService } from './monedas.service';
import { MonedasResolver } from './monedas.resolver';
import { Moneda, MonedaSchema } from './monedas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Moneda.name, schema: MonedaSchema }]),
  ],
  providers: [MonedasService, MonedasResolver],
})
export class MonedasModule {}
