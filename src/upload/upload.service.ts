import { Injectable } from '@nestjs/common';
import cloudinary from '../config/cloudinary.config';
import streamifier from 'streamifier';
import sharp from 'sharp';

@Injectable()
export class UploadService {
  private extractPublicId(url: string): string {
    const parts = url.split('/');
    const folder = parts[parts.length - 2];
    const file = parts[parts.length - 1];
    const name = file.split('.')[0];
    return `${folder}/${name}`;
  }

  async uploadImage(file: Express.Multer.File, nombre?: string): Promise<string> {
    const SIZE_LIMIT = 100 * 1024; // 100 KB
    const MAX_DIM = 600;

    let optimizedBuffer: Buffer;

    // ✔️ 1. Si ya pesa menos de 100 KB → subir sin procesar
    if (file.size <= SIZE_LIMIT) {
      optimizedBuffer = file.buffer;
    } else {
      // ✔️ 2. Procesar una sola vez (rápido)
      optimizedBuffer = await sharp(file.buffer)
        .resize(MAX_DIM, MAX_DIM, { fit: 'inside' }) // redimensionar suavemente
        .webp({
          quality: 70,  // calidad estable y buena
          effort: 3     // esfuerzo bajo → mucho más rápido
        })
        .toBuffer();

      // ✔️ 3. Si aún pesa más de 100 KB → compresión final rápida
      if (optimizedBuffer.length > SIZE_LIMIT) {
        optimizedBuffer = await sharp(optimizedBuffer)
          .webp({
            quality: 50, // compresión final
            effort: 2    // aún más rápido
          })
          .toBuffer();
      }
    }

    // ✔️ 4. Subir el buffer optimizado a Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'anuncios',
          public_id: nombre,
          overwrite: true,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('No se recibió resultado de Cloudinary'));
          resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(optimizedBuffer).pipe(uploadStream);
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






