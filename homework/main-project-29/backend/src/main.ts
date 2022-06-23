import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { HttpExceptionFillter } from './commons/fillter/http-exception.fillter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFillter());
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
