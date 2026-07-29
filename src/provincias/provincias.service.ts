import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provincia } from './provincias.schema';

@Injectable()
export class ProvinciasService {
  constructor(
    @InjectModel(Provincia.name)
    private readonly provinciaModel: Model<Provincia>,
  ) {}

  // ============================================================
  //  LISTAR PROVINCIAS (SELECT)
  // ============================================================
  async obtenerProvincias(): Promise<Provincia[]> {
    return this.provinciaModel
      .find({}, { _id: 0 })
      .sort({ Id: 1 })
      .exec();
  }

  // ============================================================
  //  OBTENER UNA PROVINCIA POR ID
  // ============================================================
  async obtenerProvinciaPorId(Id: number): Promise<Provincia | null> {
    return this.provinciaModel
      .findOne({ Id }, { _id: 0 })
      .exec();
  }
}

