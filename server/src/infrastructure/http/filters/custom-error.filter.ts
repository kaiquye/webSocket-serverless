import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IHttpResponse } from '../../../utils/app.interfaces';
import { HttpResponse } from '../responses/http.response';

@Catch(HttpResponse)
export class CustomErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpResponse<any>, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const response = {
      errorId: exception.error.errorReference,
      error: true,
      httpStatusCode: exception.httpStatusCode,
      message: Array.isArray(exception.error.message)
        ? exception.error.message
        : [exception.error.message],
    } as IHttpResponse<null>;

    httpAdapter.reply(ctx.getResponse(), response, exception.httpStatusCode);
  }
}
