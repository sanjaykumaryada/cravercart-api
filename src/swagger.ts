import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';

export const setupSwagger = (
  app: INestApplication<any>,
  globalPrefix: string,
) => {
  if (process.env.SWAGGER !== 'true') return;
  const config = new DocumentBuilder()
    .setTitle('CRAVECART')
    .setDescription('Food delivery app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix + '/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.use(`/${globalPrefix}/swagger.json`, (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  const port = process.env.PORT || 3000;
  app
    .get(Logger)
    .log(
      `🚀 Swagger json is on: http://localhost:${port}/${globalPrefix}/swagger.json`,
    );
  app
    .get(Logger)
    .log(
      `🚀 Swagger is running on: http://localhost:${port}/${globalPrefix}/docs`,
    );
};
