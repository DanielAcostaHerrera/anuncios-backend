import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Municipio } from './municipios.schema';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectModel(Municipio.name)
    private readonly municipioModel: Model<Municipio>,
  ) {}

  // ============================================================
  //  LISTAR MUNICIPIOS DE UNA PROVINCIA
  // ============================================================
  async obtenerMunicipiosPorProvincia(
    provinciaId: number,
  ): Promise<Municipio[]> {
    return this.municipioModel
      .find({ provinciaId }, { _id: 0 })
      .sort({ nombre: 1 })
      .exec();
  }
}
