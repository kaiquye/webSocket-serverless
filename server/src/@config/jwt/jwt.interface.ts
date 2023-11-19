import { EnvConfig } from '../env.config';

export type AccessTokenResponse = {
  exp: number;
  accessToken: string;
  env: string;
};

export type IPayloadBase = {
  userId: string;
  name: string;
  email: string;
  accessLevel: string;
};

export abstract class IJwt {
  protected readonly expiration: number;
  protected readonly publicKey: string;
  protected readonly secretKey: string;

  protected constructor() {
    this.expiration = EnvConfig.EXP;
    this.publicKey = EnvConfig.PUBLIC_KEY;
  }
  abstract toSign<T extends IPayloadBase>(payload: T): Promise<AccessTokenResponse>;
  abstract toVerify(token: string): Promise<Partial<IPayloadBase>>;
}
