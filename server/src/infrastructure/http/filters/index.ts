import { HttpAdapterHost } from '@nestjs/core';
import { BadRequestFilter } from './bad-request.filter';
import { InternalServerFilter } from './internal-server.filter';
import { NotFoundErrorFilter } from './not-found.filter';
import { CustomErrorFilter } from './custom-error.filter';
import { UnauthorizedExceptionFilter } from './unauthorized.filter';
import { ForbiddenExceptionFilter } from './forbiddenException.filter';

export const AppFilters = (host: HttpAdapterHost) => [
  new InternalServerFilter(host),
  new BadRequestFilter(host),
  new NotFoundErrorFilter(host),
  new UnauthorizedExceptionFilter(host),
  new ForbiddenExceptionFilter(host),
  new CustomErrorFilter(host),
];
