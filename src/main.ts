import { ValidationPipe, Inject } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from 'common/interceptors/LoggingInterceptor';
import { Logger } from 'common/log/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(new Logger()));
  await app.listen(3000);
}
bootstrap();
