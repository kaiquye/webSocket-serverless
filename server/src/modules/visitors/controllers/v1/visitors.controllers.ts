import { Body, Controller, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { EVisitor } from '../../visitors.module';
import { INewAccessUseCase } from '../../useCases/login.use-case';
import { IRegisterVisitorsUseCase } from '../../useCases/register-visitors.use-case';
import { NewAccessDtoBody } from './DTOs/new-access.dto';
import { HttpResponse } from '../../../../infrastructure/http/responses/http.response';
import { RegisterVisitorDtoBody } from './DTOs/register-visitor.dto';
import { PERMISSIONS, PermissionRequired } from '../../../../@config/user-claims.config';
import { IConfirmEmailUseCase } from '../../useCases/confirm-email.use-case';
import { ConfirmEmailBodyDto, ConfirmEmailDto } from './DTOs/confirm-email.dto';

@Controller('/v1/visitor')
export class VisitorsControllers {
  constructor(
    @Inject(EVisitor.NEW_ACCESS)
    private readonly newAccessUseCase: INewAccessUseCase,
    @Inject(EVisitor.REGISTER_VISITOR)
    private readonly registerVisitor: IRegisterVisitorsUseCase,
    @Inject(EVisitor.CONFIRM_EMAIL)
    private readonly confirmEmailCode: IConfirmEmailUseCase,
  ) { }

  @Post('/login')
  @PermissionRequired([PERMISSIONS.VISITOR])
  async login(@Body() body: NewAccessDtoBody): Promise<HttpResponse<any>> {
    return this.newAccessUseCase.perform(body);
  }

  @Post('/register')
  @PermissionRequired([PERMISSIONS.VISITOR])
  async register(@Body() body: RegisterVisitorDtoBody): Promise<HttpResponse<any>> {
    return this.registerVisitor.perform(body);
  }

  @Post('/confirm/:email')
  async confirmEmail(
    @Param() params: ConfirmEmailDto,
    @Body() body: ConfirmEmailBodyDto,
  ): Promise<HttpResponse<any>> {
    const input = {
      code: body.code,
      email: params.email,
    };

    return this.confirmEmailCode.perform(input);
  }
}
