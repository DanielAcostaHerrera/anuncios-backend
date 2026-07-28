import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvinciasService } from './provincias.service';
import { ProvinciasResolver } from './provincias.resolver';
import { Provincia, ProvinciaSchema } from './provincias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provincia.name, schema: ProvinciaSchema },
    ]),
  ],
  providers: [ProvinciasService, ProvinciasResolver],
})
export class ProvinciasModule {}
