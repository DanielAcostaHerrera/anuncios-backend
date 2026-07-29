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
    IdProvincia: number,
  ): Promise<Municipio[]> {
    return this.municipioModel
      .find({ IdProvincia }, { _id: 0 })
      .sort({ nombre: 1 })
      .exec();
  }

  // ============================================================
  //  OBTENER UN MUNICIPIO POR ID
  // ============================================================
  async obtenerMunicipioPorId(Id: number): Promise<Municipio | null> {
    return this.municipioModel
      .findOne({ Id }, { _id: 0 })
      .exec();
  }
}

