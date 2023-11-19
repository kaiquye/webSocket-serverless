import * as jwt from 'jsonwebtoken';
import { AccessTokenResponse, IJwt, IPayloadBase } from './jwt.interface';
import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from '../env.config';
import { IVisitorsRepository } from '../../modules/visitors/repository/visitors.repository.interface';
import { EVisitor } from '../../modules/visitors/visitors.module';
@Injectable()
export class JwtConfig extends IJwt {
  constructor(
  ) {
    super();
  }
  async toSign<T extends IPayloadBase>(payload: T): Promise<AccessTokenResponse> {
    const accessToken = jwt.sign(
      {
        claims: {
          accessLevel: payload.accessLevel,
          name: payload.name,
          email: payload.email,
          id: payload.userId,
        },
        sub: payload.userId,
        iss: '.dev',
        env: EnvConfig.NODE_ENV,
      },
      this.publicKey,
      {
        expiresIn: this.expiration,
      },
    );

    return {
      env: EnvConfig.NODE_ENV,
      exp: this.expiration,
      accessToken,
    };
  }

  async toVerify(token: string): Promise<Partial<IPayloadBase>> {
    try {
      const decoder = jwt.verify(token, this.publicKey)
      const claims = decoder["claims"]
      return {
        accessLevel: claims.accessLevel,
        email: claims.email,
        name: claims.name,
        userId: claims.id,
      };
    } catch (err) {
      return null
    }
  }
}
