import { Prisma } from '@prisma/client';
import { VisitorModel } from '../domain/visitors.model';

export interface IVisitorsRepository {
  save(data: VisitorModel): Promise<{ id: string }>;
  finishVisitorProfile(data: { email: string });
  update(id: string, data: Omit<Partial<VisitorModel>, 'email'>): Promise<void>;
  findByEmail(data: string): Promise<VisitorModel>;
  findClaims(data: { userId: string }): Promise<VisitorModel>;
  transaction(Ios: Prisma.PrismaPromise<any>[]);
}
