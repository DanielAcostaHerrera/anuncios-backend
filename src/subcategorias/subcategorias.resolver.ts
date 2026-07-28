import { Resolver, Query } from '@nestjs/graphql';
import { SubcategoriasService } from './subcategorias.service';
import { SubcategoriaType } from './types/subcategoria.type';

@Resolver(() => SubcategoriaType)
export class SubcategoriasResolver {
  constructor(private readonly service: SubcategoriasService) {}

  // ============================================================
  //  LISTAR SUBCATEGORÍAS
  // ============================================================
  @Query(() => [SubcategoriaType])
  subcategorias() {
    return this.service.obtenerSubcategorias();
  }
}
