import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IHttpResponse } from '../../../utils/app.interfaces';

@Catch()
export class InternalServerFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    console.debug(new Date().toISOString(), exception);

    const responseBody = {
      errorId: 'internal.error',
      error: true,
      message: 'An internal error has occurred, please try again later.',
      content: null,
      httpStatusCode: 500,
    } as IHttpResponse<null>;

    httpAdapter.reply(ctx.getResponse(), responseBody, 500);
  }
}
