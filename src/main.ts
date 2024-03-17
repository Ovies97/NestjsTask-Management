import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {


  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if(process.env.MODE_ENV === 'development')
  {
    app.enableCors();
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  
  await app.listen(process.env.PORT);
  logger.log(`application listening on port ${process.env.PORT}`);
}
bootstrap();
