import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnunciosService } from './anuncios.service';
import { AnunciosResolver } from './anuncios.resolver';
import { Anuncio, AnuncioSchema } from './anuncios.schema';
import { Counter, CounterSchema } from './counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Anuncio.name, schema: AnuncioSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  providers: [AnunciosService, AnunciosResolver],
})
export class AnunciosModule {}
