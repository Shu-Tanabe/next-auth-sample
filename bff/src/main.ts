import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.enableShutdownHooks();
  // ホストを共通化するまで cors 対策を解除
  await app.enableCors();
  await app.listen(3302, '0.0.0.0');
}
bootstrap();
