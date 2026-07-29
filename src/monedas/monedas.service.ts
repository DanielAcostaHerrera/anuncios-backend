import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Moneda } from './monedas.schema';

@Injectable()
export class MonedasService {
  constructor(
    @InjectModel(Moneda.name)
    private readonly monedaModel: Model<Moneda>,
  ) {}

  // ============================================================
  //  LISTAR MONEDAS (SELECT)
  // ============================================================
  async obtenerMonedas(): Promise<Moneda[]> {
    return this.monedaModel
      .find({}, { _id: 0 })
      .sort({ nombre: 1 })
      .exec();
  }

  // ============================================================
  //  OBTENER UNA MONEDA POR ID
  // ============================================================
  async obtenerMonedaPorId(Id: number): Promise<Moneda | null> {
    return this.monedaModel
      .findOne({ Id }, { _id: 0 })
      .exec();
  }
}

