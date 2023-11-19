import { Email } from './values/email.values-object';
import { v4 as uuid } from 'uuid';
import { HttpResponse } from '../../../infrastructure/http/responses/http.response';
import { ForbiddenException } from '@nestjs/common';
import { client } from './../../../../../lambdas/chat/index';

export enum EAccessLevel {
  VISITOR = "VISITOR",
  ADMIN = "ADMIN"
}
export interface IVisitor {
  visitor_id?: string;
  email: Email;
  name: string;
  lastAccess?: Date;
  profileCompletionRequired?: boolean;
  accessLevel?: EAccessLevel
}

export interface ICreateVisitor {
  email: string;
}

export class VisitorModel {
  visitor_id?: string;
  email: Email;
  name: string;
  lastAccess: Date;
  accessLevel: EAccessLevel;
  profileCompletionRequired: boolean;

  private constructor(input: IVisitor) {
    this.visitor_id = input.visitor_id;
    this.lastAccess = input.lastAccess;
    this.email = input.email;
    this.name = input.name;
    this.profileCompletionRequired = input?.profileCompletionRequired;
    this.accessLevel = input?.accessLevel;
  }

  static create(input: ICreateVisitor) {
    const email = Email.validate(input.email);

    const name = email.getName();

    return new VisitorModel({
      name,
      email,
    });
  }

  registerNewAccess(): boolean {
    if (!this.lastAccess) {
      this.lastAccess = new Date();
      return true;
    }

    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    if (new Date(this.lastAccess) < currentDate) {
      this.lastAccess = new Date();
      return true;
    }

    throw HttpResponse.BAD_REQUEST('Very short period to register a new access');
  }

  public registerNewRoles(newAccessLevel: EAccessLevel) {
    const isAdminRequest = newAccessLevel === EAccessLevel.ADMIN;

    if (isAdminRequest) {
      const isCurrentAdmin = this.accessLevel === EAccessLevel.ADMIN
      if (!isCurrentAdmin) {
        throw new ForbiddenException("You must be an admin to grant admin claims.");
      }
    }

    this.accessLevel = newAccessLevel;
  }

  static toDomain(input) {
    return new VisitorModel({
      name: input?.name,
      email: input?.email,
      visitor_id: input?.visitor_id,
      lastAccess: input?.lastAccess,
      profileCompletionRequired: input?.profileCompletionRequired,
      accessLevel: input?.accessLevel,
    });
  }
}
