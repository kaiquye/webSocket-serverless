import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { RegisterVisitorsUseCase } from './useCases/register-visitors.use-case';
import { JwtConfig } from '../../@config/jwt/jwt.config';
import { VisitorsRepository } from '../../infrastructure/database/repositories/postgres/visitors.repository';
import { VisitorsControllers } from './controllers/v1/visitors.controllers';
import { PrismaService } from '../../infrastructure/clients/postgres/prisma.service';
import { LoginUseCase } from './useCases/login.use-case';
import { IJwt } from '../../@config/jwt/jwt.interface';
import { InfraModule } from '../../infrastructure/infra.module';
import { EmailConfirmationRepository } from '../../infrastructure/database/repositories/postgres/email-confirmation.repository';
import { ConfirmEmailUseCase } from './useCases/confirm-email.use-case';

export const enum EVisitor {
  REGISTER_VISITOR = 'register-visitor',
  CONFIRM_EMAIL = 'confirm-email',
  NEW_ACCESS = 'new-access-visitor',
  REPOSITORY = 'visitor-rep',
  CODE_REP = 'code-confirmation',
}

export const visitorProviders: Provider[] = [
  {
    provide: EVisitor.NEW_ACCESS,
    useClass: LoginUseCase,
  },
  {
    provide: EVisitor.REGISTER_VISITOR,
    useClass: RegisterVisitorsUseCase,
  },
  {
    provide: EVisitor.REPOSITORY,
    useClass: VisitorsRepository,
  },
  {
    provide: EVisitor.CODE_REP,
    useClass: EmailConfirmationRepository,
  },
  {
    provide: EVisitor.CONFIRM_EMAIL,
    useClass: ConfirmEmailUseCase,
  },
];

@Module({
  imports: [InfraModule],
  exports: visitorProviders,
  controllers: [VisitorsControllers],
  providers: [
    PrismaService,
    ...visitorProviders,
    {
      provide: IJwt,
      useClass: JwtConfig,
    },
  ],
})
export class VisitorsModule {}
