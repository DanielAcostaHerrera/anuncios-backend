import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './categorias.schema';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name)
    private readonly categoriaModel: Model<Categoria>,
  ) {}

  // ============================================================
  //  LISTAR CATEGORÍAS (SELECT)
  // ============================================================
  async obtenerCategorias(): Promise<Categoria[]> {
    return this.categoriaModel.find({}, { _id: 0 }).sort({ nombre: 1 }).exec();
  }
}
