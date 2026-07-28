import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilitar CORS igual que en el catálogo
  app.enableCors({
    origin: '*', // puedes poner la URL del frontend si quieres restringir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Usar el puerto asignado por Render o 3000 en local
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
