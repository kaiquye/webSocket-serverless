import { TConfirmEmailCode } from '../interfaces/confirm-email.interfaces';
import { UseCase } from '../../../utils/app.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { IEmailConfirmationRepository } from '../repository/Email-confirmation.repository.interface';
import { EVisitor } from '../visitors.module';
import { HttpResponse } from '../../../infrastructure/http/responses/http.response';
import { IVisitorsRepository } from '../repository/visitors.repository.interface';

export type IConfirmEmailUseCase = UseCase<
  TConfirmEmailCode.Input,
  HttpResponse<TConfirmEmailCode.Output>
>;

@Injectable()
export class ConfirmEmailUseCase implements IConfirmEmailUseCase {
  constructor(
    @Inject(EVisitor.CODE_REP)
    private readonly CodeConfirmationRep: IEmailConfirmationRepository,
    @Inject(EVisitor.REPOSITORY)
    private readonly visitorsRep: IVisitorsRepository,
  ) { }
  async perform(data: TConfirmEmailCode.Input): Promise<HttpResponse<TConfirmEmailCode.Output>> {
    const codeFound = await this.CodeConfirmationRep.exists({
      email: data.email,
    });
    if (!codeFound) {
      throw HttpResponse.NOT_FOUND('email entered was not found');
    }
    if (codeFound.status !== 'WAITING_FOR_CONFIRMATION') {
      throw HttpResponse.BAD_REQUEST('The current status does not allow executing this action.');
    }
    if (codeFound.code !== data.code) {
      throw HttpResponse.BAD_REQUEST('code entered was not found');
    }

    const now = new Date();
    now.setDate(now.getDate() - 1);
    if (new Date(codeFound.created_at) < now) {
      await this.CodeConfirmationRep.update(codeFound.id, { status: 'EXPIRED' });
      throw HttpResponse.BAD_REQUEST('confirmation code has expired');
    }

    const finishVisitorProfile = this.visitorsRep.finishVisitorProfile({ email: data.email });
    const alterCodeConfirmationStatus = this.CodeConfirmationRep.update(codeFound.id, {
      status: 'CONFIRMED',
    });
    await this.visitorsRep.transaction([finishVisitorProfile, alterCodeConfirmationStatus]);

    return HttpResponse.OK<TConfirmEmailCode.Output>({
      success: true,
    });
  }
}
