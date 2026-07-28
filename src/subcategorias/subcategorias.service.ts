import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subcategoria } from './subcategorias.schema';

@Injectable()
export class SubcategoriasService {
  constructor(
    @InjectModel(Subcategoria.name)
    private readonly subcategoriaModel: Model<Subcategoria>,
  ) {}

  // ============================================================
  //  LISTAR SUBCATEGORÍAS (SELECT)
  // ============================================================
  async obtenerSubcategorias(): Promise<Subcategoria[]> {
    return this.subcategoriaModel.find({}, { _id: 0 }).sort({ nombre: 1 }).exec();
  }
}
