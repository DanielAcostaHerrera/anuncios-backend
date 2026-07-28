import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasService } from './categorias.service';
import { CategoriasResolver } from './categorias.resolver';
import { Categoria, CategoriaSchema } from './categorias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categoria.name, schema: CategoriaSchema },
    ]),
  ],
  providers: [CategoriasService, CategoriasResolver],
})
export class CategoriasModule {}
