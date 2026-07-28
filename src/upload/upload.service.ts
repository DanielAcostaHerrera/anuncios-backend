import { Injectable } from '@nestjs/common';
import cloudinary from '../config/cloudinary.config';
import streamifier from 'streamifier';

@Injectable()
export class UploadService {
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
}






