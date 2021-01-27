import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['warn', 'error'],
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3434, '0.0.0.0');
  console.log(`Application is running on ${await app.getUrl()}`);
}

bootstrap();
