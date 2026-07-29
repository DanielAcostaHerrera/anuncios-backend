import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { MonedasService } from './monedas.service';
import { MonedaType } from './types/moneda.type';

@Resolver(() => MonedaType)
export class MonedasResolver {
  constructor(private readonly service: MonedasService) {}

  // ============================================================
  //  LISTAR MONEDAS
  // ============================================================
  @Query(() => [MonedaType])
  monedas() {
    return this.service.obtenerMonedas();
  }

  // ============================================================
  //  OBTENER UNA MONEDA POR ID
  // ============================================================
  @Query(() => MonedaType, { nullable: true })
  moneda(@Args('Id', { type: () => Int }) Id: number) {
    return this.service.obtenerMonedaPorId(Id);
  }
}

