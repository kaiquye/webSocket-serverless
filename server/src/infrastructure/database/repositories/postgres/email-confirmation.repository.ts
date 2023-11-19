import { PrismaService } from '../../../clients/postgres/prisma.service';
import {
  IEmailConfirmation,
  IEmailConfirmationRepository,
  IUpdatedEmailConfirmation,
} from '../../../../modules/visitors/repository/Email-confirmation.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailConfirmationRepository implements IEmailConfirmationRepository {
  constructor(private readonly prisma: PrismaService) { }

  async saveEmail(data: IEmailConfirmation): Promise<void> {
    await this.prisma.emailConfirmation.create({
      data: {
        email: data.email,
        code: data.code,
      },
    });
  }

  update(id: string, data: IUpdatedEmailConfirmation) {
    return this.prisma.emailConfirmation.update({
      data: {
        status: data.status,
      },
      where: {
        id,
      },
    });
  }

  async exists(data: { email: string }): Promise<Partial<IEmailConfirmation>> {
    return this.prisma.emailConfirmation.findFirst({
      where: {
        email: data.email,
      },
    });
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
