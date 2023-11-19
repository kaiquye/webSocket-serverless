import { Test, TestingModule } from '@nestjs/testing';
import { IRegisterVisitorsUseCase, RegisterVisitorsUseCase } from '../register-visitors.use-case';
import { VisitorsRepositoryInMemory } from '../../../../infrastructure/database/repositories/inMemory/visitors.repository.in-memory';
import { VisitorModel } from '../../domain/visitors.model';
import { EVisitor } from '../../visitors.module';

describe('register new visitor', function () {
  let repository: VisitorsRepositoryInMemory;
  let service: IRegisterVisitorsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterVisitorsUseCase,
        {
          provide: EVisitor.REPOSITORY,
          useClass: VisitorsRepositoryInMemory,
        },
      ],
    }).compile();

    service = module.get<IRegisterVisitorsUseCase>(RegisterVisitorsUseCase);
    repository = module.get<VisitorsRepositoryInMemory>(EVisitor.REPOSITORY);
  });

  afterEach(() => {
    // Verificar. N esta zerando o banco de dados.
    repository.values.length = 0;
  });

  it('should register new visitor', async function () {
    const result = await service.perform({
      email: 'kaique@gmail.com',
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty('content');
    expect(result.content.success).toEqual(true);
    expect(result.content.scope).toEqual(['default']);
  });

  it('should return visitor already married', async function () {
    const visitor = VisitorModel.create({
      email: 'already@mail.com',
    });
    await repository.save(visitor);

    const body = {
      email: 'already@mail.com',
    };

    try {
      await service.perform(body);
      expect(false).toEqual(true);
    } catch (exception) {
      console.log(exception);
      expect(exception).toHaveProperty('error');
      expect(exception.httpStatusCode).toEqual(409);
      expect(exception.error.message).toEqual('already registered visitor');
      expect(exception.error.errorReference).toEqual('[visitor]:already-registered');
      // expect(exception.error.idErrorReference).toBeDefined();
    }
  });
});
