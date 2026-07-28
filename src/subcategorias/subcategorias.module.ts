import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriasService } from './subcategorias.service';
import { SubcategoriasResolver } from './subcategorias.resolver';
import { Subcategoria, SubcategoriaSchema } from './subcategorias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subcategoria.name, schema: SubcategoriaSchema },
    ]),
  ],
  providers: [SubcategoriasService, SubcategoriasResolver],
})
export class SubcategoriasModule {}
