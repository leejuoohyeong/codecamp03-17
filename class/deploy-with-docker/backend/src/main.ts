import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFillter } from './commons/fillter/http-exception.fillter';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  console.log('qqq123');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFillter());
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
