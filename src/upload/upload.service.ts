import { Injectable } from '@nestjs/common';
import cloudinary from '../config/cloudinary.config';
import streamifier from 'streamifier';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'anuncios' }, // opcional, organiza en carpeta lógica
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('No se recibió resultado de Cloudinary'));
          resolve(result.secure_url);
        },
      );

      // ✅ Usamos buffer en vez de path
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}




