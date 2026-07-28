import { Injectable } from '@nestjs/common';
import cloudinary from '../config/cloudinary.config';
import streamifier from 'streamifier';

@Injectable()
export class UploadService {
  private extractPublicId(url: string): string {
    const parts = url.split('/');
    const folder = parts[parts.length - 2];        // anuncios
    const file = parts[parts.length - 1];          // ImagenPrueba.webp
    const name = file.split('.')[0];               // ImagenPrueba
    return `${folder}/${name}`;                    // anuncios/ImagenPrueba
  }
  
  async uploadImage(file: Express.Multer.File, nombre?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'anuncios',
          public_id: nombre,   // ✅ si viene, se usa como nombre
          overwrite: true,     // opcional: reemplaza si ya existe
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('No se recibió resultado de Cloudinary'));
          resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImageByUrl(url: string): Promise<boolean> {
    const publicId = this.extractPublicId(url);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result.result === 'ok');
      });
    });
  }
}






