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
  municipios(@Args('IdProvincia', { type: () => Int }) IdProvincia: number) {
    return this.service.obtenerMunicipiosPorProvincia(IdProvincia);
  }

  // ============================================================
  //  OBTENER UN MUNICIPIO POR ID
  // ============================================================
  @Query(() => MunicipioType, { nullable: true })
  municipio(@Args('Id', { type: () => Int }) Id: number) {
    return this.service.obtenerMunicipioPorId(Id);
  }
}

