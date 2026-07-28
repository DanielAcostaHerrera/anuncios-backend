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
  // 1. Tamaño máximo permitido
  const SIZE_LIMIT = 100 * 1024; // 100 KB
  const MAX_DIM = 600;

  // 2. Convertir a WebP y redimensionar
  let quality = 90;
  let optimizedBuffer: Buffer;

  while (quality >= 40) {
    optimizedBuffer = await sharp(file.buffer)
      .resize(MAX_DIM, MAX_DIM, { fit: 'inside' })
      .webp({ quality })
      .toBuffer();

    if (optimizedBuffer.length <= SIZE_LIMIT) break;

    quality -= 10; // bajar calidad si aún pesa demasiado
  }

  // 3. Subir el buffer optimizado a Cloudinary
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

    // 4. Subir el buffer optimizado
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






