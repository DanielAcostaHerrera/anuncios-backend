import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ProvinciasService } from './provincias.service';
import { ProvinciaType } from './types/provincia.type';

@Resolver(() => ProvinciaType)
export class ProvinciasResolver {
  constructor(private readonly service: ProvinciasService) {}

  // ============================================================
  //  LISTAR PROVINCIAS (SELECT)
  // ============================================================
  @Query(() => [ProvinciaType])
  provincias() {
    return this.service.obtenerProvincias();
  }

  // ============================================================
  //  OBTENER UNA PROVINCIA POR ID
  // ============================================================
  @Query(() => ProvinciaType, { nullable: true })
  provincia(@Args('Id', { type: () => Int }) Id: number) {
    return this.service.obtenerProvinciaPorId(Id);
  }
}

