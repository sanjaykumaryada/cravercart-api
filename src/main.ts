import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug'],
  });
  const globalPrefix = 'api/v1';
  const port = process.env.PORT || 3000;
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(globalPrefix);

  setupSwagger(app, globalPrefix);

  await app.listen(port);
  app
    .get(Logger)
    .log(`🚀 Backend is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
