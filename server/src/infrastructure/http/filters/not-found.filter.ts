import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(NotFoundException)
export class NotFoundErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const responseBody = {
      error: {
        status: true,
        messages: ['The requested resource was not found.'],
        code: 'resource.not.found',
      },
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, exception.getStatus());
  }
}
