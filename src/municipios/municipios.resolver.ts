import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { MunicipioType } from './types/municipio.type';
import { MunicipiosService } from './municipios.services';

@Resolver(() => MunicipioType)
export class MunicipiosResolver {
  constructor(private readonly service: MunicipiosService) {}

  // ============================================================
  //  LISTAR MUNICIPIOS DE UNA PROVINCIA
  // ============================================================
  @Query(() => [MunicipioType])
  municipios(@Args('provinciaId', { type: () => Int }) provinciaId: number) {
    return this.service.obtenerMunicipiosPorProvincia(provinciaId);
  }
}
