import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anuncio } from './anuncios.schema';
import { Counter } from './counter.schema';
import { AnunciosResultType } from './types/anuncios-result.type';
import { CrearAnuncioInput } from './dto/crear-anuncio.input';
import { ActualizarAnuncioInput } from './dto/actualizar-anuncio.input';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Injectable()
export class AnunciosService {
  constructor(
    @InjectModel(Anuncio.name)
    private readonly anuncioModel: Model<Anuncio>,

    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
  ) {}

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ============================================================
  //  GENERAR ID AUTOINCREMENTAL
  // ============================================================
  private async getNextId(): Promise<number> {
    let counter = await this.counterModel.findOneAndUpdate(
      { name: 'anuncios' },
      { $inc: { value: 1 } },
      { new: true },
    );

    if (!counter) {
      const maxAnuncio = await this.anuncioModel
        .findOne()
        .sort({ Id: -1 })
        .exec();
      const startValue = maxAnuncio ? maxAnuncio.Id : 0;

      counter = await this.counterModel.create({
        name: 'anuncios',
        value: startValue + 1,
      });
    }

    return counter.value;
  }

  // ============================================================
  //  CREAR ANUNCIO
  // ============================================================
  async crearAnuncio(data: CrearAnuncioInput): Promise<Anuncio> {
    const nextId = await this.getNextId();

    const nuevo = new this.anuncioModel({
      Id: nextId,
      ...data,
      FechaActualizacion: new Date(), 
    });

    return nuevo.save();
  }

  // ============================================================
  //  EDITAR ANUNCIO
  // ============================================================
  async actualizarAnuncio(
    data: ActualizarAnuncioInput,
  ): Promise<Anuncio | null> {
    data.FechaActualizacion = new Date();

    return this.anuncioModel.findOneAndUpdate(
      { Id: data.Id },
      { $set: data },
      { new: true },
    );
  }

  // ============================================================
  //  ELIMINAR ANUNCIO
  // ============================================================
  async eliminarAnuncio(Id: number): Promise<boolean> {
    const result = await this.anuncioModel.deleteOne({ Id });
    return result.deletedCount === 1;
  }

  // ============================================================
  //  OBTENER ANUNCIO POR ID
  // ============================================================
  async obtenerAnuncioPorId(id: number): Promise<Anuncio | null> {
    return this.anuncioModel.findOne({ Id: id }, { _id: 0 }).exec();
  }

  // ============================================================
  //  OBTENER PAGINADO (100 por página)
  // ============================================================
  async obtenerPaginado(page: number): Promise<AnunciosResultType> {
    const limit = 100;
    const skip = (page - 1) * limit;

    const [anuncios, total] = await Promise.all([
      this.anuncioModel
        .find({}, { _id: 0 })
        .sort({ FechaActualizacion: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),

      this.anuncioModel.countDocuments().exec(),
    ]);

    return { anuncios, total };
  }

  // ============================================================
  //  CATÁLOGO FILTRADO
  // ============================================================
  async filtrarAnuncios(filtros: any) {
    const {
      page,
      limit,
      titulo,
      precioMin,
      precioMax,
      provincia,
      municipio,
      categoria,
      subcategoria,
      fechaMin,    
      fechaMax,
    } = filtros;

    const query: any = {};

    if (titulo) {
      const term = escapeRegex(titulo);
      query.Titulo = { $regex: term, $options: 'i' };
    }

    if (categoria !== undefined) {
      query.Categoria = categoria;
    }

    if (subcategoria !== undefined) {
      query.IdSubcategoria = subcategoria;   // ⭐ NUEVO
    }

    if (provincia !== undefined) {
      query.Provincia = provincia;
    }

    if (municipio !== undefined) {
      query.Municipio = municipio;
    }

    if (fechaMin || fechaMax) {
      query.FechaActualizacion = {};

      if (fechaMin) {
        query.FechaActualizacion.$gte = new Date(fechaMin);
      }
      if (fechaMax) {
        query.FechaActualizacion.$lte = new Date(fechaMax);
      }
    }

    let anuncios = await this.anuncioModel
      .find(query, { _id: 0 })
      .sort({ FechaActualizacion: -1 })
      .exec();

    if (precioMin !== undefined || precioMax !== undefined) {
      anuncios = anuncios.filter((a) => {
        const precio = a.Precio;
        if (precioMin !== undefined && precio < precioMin) return false;
        if (precioMax !== undefined && precio > precioMax) return false;
        return true;
      });
    }

    const total = anuncios.length;

    const start = (page - 1) * limit;
    const end = start + limit;
    const pagina = anuncios.slice(start, end);

    return {
      anuncios: pagina,
      total,
    };
  }
}

