import { Resolver, Query } from '@nestjs/graphql';
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
}
