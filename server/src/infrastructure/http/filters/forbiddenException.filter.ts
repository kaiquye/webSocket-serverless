import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IHttpResponse } from 'src/utils/app.interfaces';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        console.debug(new Date().toISOString(), exception.cause);

        const responseBody = {
            error: true,
            errorId: 'forbidden.error',
            message: exception.message,
            httpStatusCode: 403,
        } as IHttpResponse<null>;

        httpAdapter.reply(ctx.getResponse(), responseBody, exception.getStatus());
    }
}
