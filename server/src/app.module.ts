import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONSTANTSSchema } from './@config/schame.config';
import { VisitorsModule } from './modules/visitors/visitors.module';
import { IsAuthenticatedMiddleware } from './infrastructure/http/middlewares/authenticated.middleware';
import { IJwt } from './@config/jwt/jwt.interface';
import { JwtConfig } from './@config/jwt/jwt.config';

@Module({
  imports: [ConfigModule.forRoot(CONSTANTSSchema), VisitorsModule],
  providers: [
    {
      provide: IJwt,
      useClass: JwtConfig,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAuthenticatedMiddleware)
      .exclude(
        { path: '/v1/visitor/login', method: RequestMethod.POST },
        { path: '/v1/visitor/register', method: RequestMethod.POST }
      )
      .forRoutes(
        { path: '*', method: RequestMethod.ALL },
      );

  }
}
