import { Resolver, Query, Args, Int } from '@nestjs/graphql';
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

  // ============================================================
  //  OBTENER UNA CATEGORÍA POR ID
  // ============================================================
  @Query(() => CategoriaType, { nullable: true })
  categoria(@Args('Id', { type: () => Int }) Id: number) {
    return this.service.obtenerCategoriaPorId(Id);
  }
}

