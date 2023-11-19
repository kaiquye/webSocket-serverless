import { config } from 'dotenv';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppFilters } from './infrastructure/http/filters';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfig } from './@config/env.config';
import { ResponseInterceptor } from './infrastructure/http/interceptors/response.interceptor';
import { LoggingInterceptor } from './infrastructure/http/interceptors/logging.interceptor';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(...AppFilters(httpAdapter));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(EnvConfig.PORT, () => console.warn("Bomb has been planted." + ' | ' + EnvConfig.PORT));
}

bootstrap();
