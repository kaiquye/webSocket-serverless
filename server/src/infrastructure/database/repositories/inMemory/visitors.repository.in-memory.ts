import { IVisitorsRepository } from '../../../../modules/visitors/repository/visitors.repository.interface';
import { VisitorModel } from '../../../../modules/visitors/domain/visitors.model';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class VisitorsRepositoryInMemory implements IVisitorsRepository {
  public values: VisitorModel[] = [];

  async findByEmail(email: string): Promise<VisitorModel> {
    return Promise.resolve(this.values.find((value) => value?.email.value === email));
  }

  async save(data: VisitorModel): Promise<{ id: string }> {
    console.log(this.values);
    this.values.push(data);

    return {
      id: data.visitor_id,
    };
  }

  async findClaims(data: { userId: string }): Promise<VisitorModel> {
    return Promise.resolve(this.values.find((vst) => vst.visitor_id === data.userId));
  }

  update(id: string, data: Omit<Partial<VisitorModel>, 'email'>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  finishVisitorProfile(data: { email: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  transaction(Ios: Prisma.PrismaPromise<any>[]) {
    throw new Error('Method not implemented.');
  }
}
