import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProvinciasModule } from './provincias/provincias.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { MonedasModule } from './monedas/monedas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { AnunciosModule } from './anuncios/anuncios.module';
import { SubcategoriasModule } from './subcategorias/subcategorias.module';
import { UploadModule } from './upload/upload.module'; // ✅ Importa aquí

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      csrfPrevention: false,
    }),

    ProvinciasModule,
    MunicipiosModule,
    MonedasModule,
    CategoriasModule,
    SubcategoriasModule,
    AnunciosModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

