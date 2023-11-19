import { CodeConfirmationStatus } from '@prisma/client';

export interface IEmailConfirmation {
  id?: string;
  email: string;
  code: number;
  status: CodeConfirmationStatus;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUpdatedEmailConfirmation {
  id: string;
  status: CodeConfirmationStatus;
}

export interface ICodeResponse {
  code: string;
}
export interface IEmailConfirmationRepository {
  saveEmail(data: IEmailConfirmation): Promise<void>;
  exists(data: { email: string }): Promise<Partial<IEmailConfirmation>>;
  update(id: string, data: Partial<IEmailConfirmation>);
  delete(id: string): Promise<void>;
}
