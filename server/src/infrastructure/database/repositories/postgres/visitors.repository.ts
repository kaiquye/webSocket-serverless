import { IVisitorsRepository } from '../../../../modules/visitors/repository/visitors.repository.interface';
import { IVisitor, VisitorModel } from '../../../../modules/visitors/domain/visitors.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../clients/postgres/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VisitorsRepository implements IVisitorsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async transaction(Ios: Prisma.PrismaPromise<any>[]) {
    return this.prisma.$transaction(Ios);
  }

  async findByEmail(data: string): Promise<VisitorModel> {
    const visitor = await this.prisma.visitors.findFirst({
      where: {
        email: data,
      },
    });
    return VisitorModel.toDomain(visitor);
  }

  async save(data: VisitorModel): Promise<{ id: string }> {
    const created = await this.prisma.visitors.create({
      data: { ...data, email: data.email.value },
    });

    return {
      id: created?.visitor_id,
    };
  }

  finishVisitorProfile(data: { email: string }) {
    return this.prisma.visitors.update({
      where: {
        email: data.email,
      },
      data: {
        profileCompletionRequired: true,
      },
    });
  }

  async update(id: string, data: Omit<Partial<VisitorModel>, 'email'>): Promise<void> {
    await this.prisma.visitors.update({
      where: {
        visitor_id: id,
      },
      data: {
        ...data,
      },
    });
  }

  findClaims(data: { userId: string }): Promise<VisitorModel> {
    return Promise.resolve(undefined);
  }
}
