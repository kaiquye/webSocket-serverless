import { UseCase } from '../../../utils/app.interfaces';
import { TNewAccess } from '../interfaces/new-acces.use-case.interface';
import { HttpResponse } from '../../../infrastructure/http/responses/http.response';
import { Inject, Injectable } from '@nestjs/common';
import { IVisitorsRepository } from '../repository/visitors.repository.interface';
import { IJwt } from '../../../@config/jwt/jwt.interface';
import { EVisitor } from '../visitors.module';
import { IEmailConfirmationRepository } from '../repository/Email-confirmation.repository.interface';

export type INewAccessUseCase = UseCase<TNewAccess.Input, HttpResponse<TNewAccess.Output>>;

@Injectable()
export class LoginUseCase implements INewAccessUseCase {
  constructor(
    @Inject(IJwt)
    private readonly jwt: IJwt,
    @Inject(EVisitor.REPOSITORY)
    private visitorsRep: IVisitorsRepository,
  ) {}
  async perform(data: TNewAccess.Input): Promise<HttpResponse<TNewAccess.Output>> {
    const visitorFound = await this.visitorsRep.findByEmail(data.email);
    console.log(visitorFound);
    if (!visitorFound?.visitor_id) {
      throw HttpResponse.UNAUTHORIZAED('Unauthorized');
    }

    if (!visitorFound.profileCompletionRequired) {
      throw HttpResponse.BAD_REQUEST('email was not confirmed');
    }

    const token = await this.jwt.toSign({
      accessLevel: visitorFound.accessLevel,
      userId: visitorFound.visitor_id,
      name: visitorFound.name,
      email: visitorFound.email.value,
    });
    const { accessToken, exp } = token;

    visitorFound.registerNewAccess();
    await this.visitorsRep.update(visitorFound.visitor_id, visitorFound);

    return HttpResponse.OK<TNewAccess.Output>({
      accessToken,
      expiresIn: exp,
      rules: undefined,
    });
  }
}
