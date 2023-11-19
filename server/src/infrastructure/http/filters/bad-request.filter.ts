import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IHttpResponse } from '../../../utils/app.interfaces';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: BadRequestException, host: ArgumentsHost): any {
    console.log(exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const defaultResponse = exception.getResponse() as BadRequestException;

    const response = {
      errorId: 'validation.error',
      error: true,
      content: null,
      httpStatusCode: exception.getStatus(),
      message: Array.isArray(defaultResponse.message)
        ? defaultResponse.message
        : [defaultResponse.message],
    } as IHttpResponse<null>;

    httpAdapter.reply(ctx.getResponse(), response, exception.getStatus());
  }
}
