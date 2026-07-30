import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { AnunciosService } from './anuncios.service';
import { AnuncioType } from './types/anuncio.type';
import { CrearAnuncioInput } from './dto/crear-anuncio.input';
import { ActualizarAnuncioInput } from './dto/actualizar-anuncio.input';
import { AnunciosResult } from './anuncio.result';

@Resolver(() => AnuncioType)
export class AnunciosResolver {
  constructor(private readonly service: AnunciosService) {}

  // ============================================================
  //  CREAR ANUNCIO
  // ============================================================
  @Mutation(() => AnuncioType)
  crearAnuncio(@Args('data') data: CrearAnuncioInput) {
    return this.service.crearAnuncio(data);
  }

  // ============================================================
  //  ACTUALIZAR ANUNCIO
  // ============================================================
  @Mutation(() => AnuncioType, { nullable: true })
  actualizarAnuncio(@Args('data') data: ActualizarAnuncioInput) {
    return this.service.actualizarAnuncio(data);
  }

  // ============================================================
  //  ELIMINAR ANUNCIO
  // ============================================================
  @Mutation(() => Boolean)
  eliminarAnuncio(@Args('Id', { type: () => Int }) Id: number) {
    return this.service.eliminarAnuncio(Id);
  }

  // ============================================================
  //  OBTENER UN ANUNCIO POR ID
  // ============================================================
  @Query(() => AnuncioType, { nullable: true })
  anuncio(@Args('Id', { type: () => Int }) Id: number) {
    return this.service.obtenerAnuncioPorId(Id);
  }

  // ============================================================
  //  OBTENER TODOS (PAGINADO DE 100 EN 100)
  // ============================================================
  @Query(() => AnunciosResult)
  anuncios(@Args('page', { type: () => Int }) page: number) {
    return this.service.obtenerPaginado(page);
  }

  // ============================================================
  //  FILTRAR ANUNCIOS
  // ============================================================
  @Query(() => AnunciosResult)
  filtrarAnuncios(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('titulo', { type: () => String, nullable: true }) titulo?: string,
    @Args('moneda', { type: () => Int, nullable: true }) moneda?: number,
    @Args('precioMin', { type: () => Float, nullable: true }) precioMin?: number,
    @Args('precioMax', { type: () => Float, nullable: true }) precioMax?: number,
    @Args('provincia', { type: () => Int, nullable: true }) provincia?: number,
    @Args('municipio', { type: () => Int, nullable: true }) municipio?: number,
    @Args('categoria', { type: () => Int, nullable: true }) categoria?: number,
    @Args('subcategoria', { type: () => Int, nullable: true }) subcategoria?: number,
    @Args('fechaMin', { type: () => String, nullable: true }) fechaMin?: string,
    @Args('fechaMax', { type: () => String, nullable: true }) fechaMax?: string,
  ) {
    return this.service.filtrarAnuncios({
      page,
      limit,
      titulo,
      moneda,
      precioMin,
      precioMax,
      provincia,
      municipio,
      categoria,
      subcategoria,
      fechaMin,
      fechaMax,
    });
  }
}
