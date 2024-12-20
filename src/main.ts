/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://staging.fanam-pay.fanamdigital.com',
    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = 3333;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Fanam Pay Passkey Service')
    .setDescription('Fanam pay Passkey Service is the way to ease your project authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        if (validationErrors.length) {
          return new BadRequestException({
            status_code: 400,
            status: 'Error',
            message: 'Invalid request',
            result: null,
            error: validationErrors.map((error) => ({
              field: error.property,
              response: Object.values(error.constraints).join(', '),
            }))[0],
          });
        }
      },
    }),
  );
  
  // const loggerService = app.get(LoggerService);
  // const logger = new LoggerMiddleware(loggerService);
  // app.use((req, res, next) => logger.use(req, res, next));
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
