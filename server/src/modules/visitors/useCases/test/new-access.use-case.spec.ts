import { VisitorsRepositoryInMemory } from '../../../../infrastructure/database/repositories/inMemory/visitors.repository.in-memory';
import { Test } from '@nestjs/testing';
import { VisitorModel } from '../../domain/visitors.model';
import { LoginUseCase } from '../login.use-case';
import { IResponse } from '../../../../infrastructure/http/responses/http.response';
import { IJwt } from '../../../../@config/jwt/jwt.interface';
import { JwtConfig } from '../../../../@config/jwt/jwt.config';
import { ConfigService } from '@nestjs/config';
import { EVisitor } from '../../visitors.module';

describe('new access visitor', function () {
  let repository: VisitorsRepositoryInMemory;
  let service: LoginUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: EVisitor.REPOSITORY,
          useClass: VisitorsRepositoryInMemory,
        },
        {
          provide: IJwt,
          useClass: JwtConfig,
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<LoginUseCase>(LoginUseCase);
    repository = module.get<VisitorsRepositoryInMemory>(EVisitor.REPOSITORY);
  });

  it('should return new access token', async function () {
    const mock = VisitorModel.create({
      email: 'mock@mail.com',
    });
    await repository.save(mock);

    const result = await service.perform({
      email: mock.email.value,
    });

    expect(result).toHaveProperty('content');
    expect(result.content).toHaveProperty('accessToken');
    expect(result.content).toHaveProperty('rules');
    expect(result.content).toHaveProperty('expiresIn');
  });
  it('should return visitor not found', async function () {
    const mock = 'doesNotExist@gmail.com';

    try {
      await service.perform({
        email: mock,
      });
      expect(false).toEqual(true);
    } catch (exception: IResponse<any> | any) {
      expect(exception).toHaveProperty('error');
      expect(exception.httpStatusCode).toEqual(401);
      expect(exception.error.message).toEqual('Unauthorized');
      expect(exception.error.errorReference).toEqual('[visitor]:not-found');
    }
  });
});
