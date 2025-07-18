import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CLIENT_SITE || 'http://localhost:3000',
    credentials: true
  })

  // app.set('trust proxy', 1);


  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
