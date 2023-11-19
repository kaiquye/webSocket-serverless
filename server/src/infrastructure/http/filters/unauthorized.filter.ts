import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IHttpResponse } from 'src/utils/app.interfaces';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        console.debug(new Date().toISOString(), exception.cause);

        const responseBody = {
            error: true,
            errorId: 'unauthorized.error',
            message: exception.message,
            httpStatusCode: 401,
        } as IHttpResponse<null>;

        httpAdapter.reply(ctx.getResponse(), responseBody, exception.getStatus());
    }
}
