import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './shared/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app
    .listen(process.env.PORT)
    .then(() => console.log('listening on port ' + process.env.PORT));
}
bootstrap();
