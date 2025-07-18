import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CLIENT_SITE || 'http://localhost:3000',
    credentials: true
  })

  app.set('trust proxy', 1);


  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
