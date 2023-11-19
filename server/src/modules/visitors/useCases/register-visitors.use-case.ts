import { UseCase } from '../../../utils/app.interfaces';
import { RegisterVisitors } from '../interfaces/register-visitors.use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IVisitorsRepository } from '../repository/visitors.repository.interface';
import { HttpResponse } from '../../../infrastructure/http/responses/http.response';
import { EAccessLevel, VisitorModel } from '../domain/visitors.model';
import { EVisitor } from '../visitors.module';
import { ISendCodeConfirmation } from '../../../infrastructure/mail/send-code-confirmation.email';
import { IEmailConfirmationRepository } from '../repository/Email-confirmation.repository.interface';

export type IRegisterVisitorsUseCase = UseCase<
  RegisterVisitors.Input,
  HttpResponse<RegisterVisitors.Output>
>;

@Injectable()
export class RegisterVisitorsUseCase implements IRegisterVisitorsUseCase {
  constructor(
    @Inject(EVisitor.REPOSITORY)
    private readonly visitorRepository: IVisitorsRepository,
    @Inject(EVisitor.CODE_REP)
    private readonly CodeConfirmationRep: IEmailConfirmationRepository,
    @Inject('send-confirmation-code')
    private readonly sendConfirmationCode: ISendCodeConfirmation,
  ) { }
  async perform(data?: RegisterVisitors.Input): Promise<HttpResponse<RegisterVisitors.Output>> {
    const alreadyExists = await this.visitorRepository.findByEmail(data.email);
    if (alreadyExists.visitor_id) {
      throw HttpResponse.CONFLICT('already registered visitor');
    }

    const newVisitorDomain = VisitorModel.create({ email: data.email });

    newVisitorDomain.registerNewAccess();
    newVisitorDomain.registerNewRoles(EAccessLevel.VISITOR)

    await this.visitorRepository.save(newVisitorDomain);

    const emailSent = await this.sendConfirmationCode.perform({ email: data.email });
    if (emailSent?.error) {
      throw HttpResponse.INTERNAL_ERROR('The mail could not be sent');
    }

    await this.CodeConfirmationRep.saveEmail({
      status: 'WAITING_FOR_CONFIRMATION',
      code: Number(emailSent.code),
      email: newVisitorDomain.email.value,
    });

    return HttpResponse.CREATED<RegisterVisitors.Output>({
      success: true,
      accessLevel: [newVisitorDomain.accessLevel],
    });
  }
}
