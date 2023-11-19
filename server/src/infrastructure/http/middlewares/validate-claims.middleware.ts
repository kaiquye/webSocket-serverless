import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const roles = this.reflector.get<string[]>('claims', context.getHandler());
    if (!roles) {
      return true;
    }

    if (!user) {
      return false;
    }

    if (!roles.includes(user.accessLevel)) {
      return false;
    }
    return true;
  }
}
