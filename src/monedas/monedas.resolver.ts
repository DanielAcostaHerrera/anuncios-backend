import { Resolver, Query } from '@nestjs/graphql';
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
}
