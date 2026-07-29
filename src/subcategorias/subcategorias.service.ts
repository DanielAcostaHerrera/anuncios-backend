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
  //  LISTAR SUBCATEGORÍAS POR CATEGORÍA
  // ============================================================
  async obtenerSubcategoriasPorCategoria(
    IdCategoria: number,
  ): Promise<Subcategoria[]> {
    return this.subcategoriaModel
      .find({ IdCategoria }, { _id: 0 })
      .sort({ nombre: 1 })
      .exec();
  }

  // ============================================================
  //  OBTENER UNA SUBCATEGORÍA POR ID
  // ============================================================
  async obtenerSubcategoriaPorId(Id: number): Promise<Subcategoria | null> {
    return this.subcategoriaModel
      .findOne({ Id }, { _id: 0 })
      .exec();
  }
}


