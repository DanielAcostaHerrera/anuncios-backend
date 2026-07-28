import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SubcategoriasService } from './subcategorias.service';
import { SubcategoriaType } from './types/subcategoria.type';

@Resolver(() => SubcategoriaType)
export class SubcategoriasResolver {
  constructor(private readonly service: SubcategoriasService) {}

  // ============================================================
  //  LISTAR SUBCATEGORÍAS POR CATEGORÍA
  // ============================================================
  @Query(() => [SubcategoriaType])
  subcategorias(
    @Args('IdCategoria', { type: () => Int }) IdCategoria: number,
  ) {
    return this.service.obtenerSubcategoriasPorCategoria(IdCategoria);
  }
}

