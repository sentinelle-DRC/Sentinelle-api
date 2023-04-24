import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sentinelle api')
    .setDescription('Api for the sentinelle RDC mobile app')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://sentinelledrc.vercel.app/',
      'https://sentinelledrc.vercel.app/home',
      'https://sentinelledrc.vercel.app/auth',
    ],
  });

  await app.listen(process.env.PORT);
}
bootstrap();
