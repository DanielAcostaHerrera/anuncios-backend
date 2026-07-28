import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MunicipiosResolver } from './municipios.resolver';
import { Municipio, MunicipioSchema } from './municipios.schema';
import { MunicipiosService } from './municipios.services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Municipio.name, schema: MunicipioSchema },
    ]),
  ],
  providers: [MunicipiosService, MunicipiosResolver],
})
export class MunicipiosModule {}
