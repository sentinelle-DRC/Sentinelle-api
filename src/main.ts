import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  var whitelist = [
    'https://sentinelledrc.vercel.app',
    'https://sentinelledrc.vercel.app/auth',
    'https://sentinelledrc.vercel.app/home',
    'sentinelledrc.vercel.app',
    'sentinelledrc.vercel.app/auth',
    'sentinelledrc.vercel.app/home',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  const config = new DocumentBuilder()
    .setTitle('Sentinelle api')
    .setDescription('Api for the sentinelle RDC mobile app')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
}
bootstrap();
