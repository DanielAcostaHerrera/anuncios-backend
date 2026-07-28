import { Resolver, Query } from '@nestjs/graphql';
import { CategoriasService } from './categorias.service';
import { CategoriaType } from './types/categoria.type';

@Resolver(() => CategoriaType)
export class CategoriasResolver {
  constructor(private readonly service: CategoriasService) {}

  // ============================================================
  //  LISTAR CATEGORÍAS
  // ============================================================
  @Query(() => [CategoriaType])
  categorias() {
    return this.service.obtenerCategorias();
  }
}
