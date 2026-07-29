import { Controller, Post, UploadedFile, UseInterceptors, Body, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Multer } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.uploadService.uploadImage(file);
    return { url };
  }

  @Delete('image')
  async delete(@Body('url') url: string) {
    const ok = await this.uploadService.deleteImageByUrl(url);
    return { deleted: ok };
  }
}







