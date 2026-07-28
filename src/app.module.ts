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

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      csrfPrevention: false,
    }),

    // ❌ No ServeStaticModule porque las fotos estarán en Cloudinary

    ProvinciasModule,
    MunicipiosModule,
    MonedasModule,
    CategoriasModule,
    SubcategoriasModule,
    AnunciosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
