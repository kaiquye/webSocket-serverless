import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IJwt } from '../../../@config/jwt/jwt.interface';

@Injectable()
export class IsAuthenticatedMiddleware implements NestMiddleware {
  constructor(
    @Inject(IJwt)
    private readonly jwt: IJwt,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new UnauthorizedException();
      }

      const [tokenType, token] = accessToken.split(' ');
      if (tokenType !== 'Bearer') {
        throw new UnauthorizedException('Invalid token');
      }

      const valid = await this.jwt.toVerify(token);
      if (!valid) {
        throw new UnauthorizedException();
      }

      req['user'] = { ...valid };
      next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized', { cause: error });
    }
  }
}
