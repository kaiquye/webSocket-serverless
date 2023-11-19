import { UseCase } from '../../utils/app.interfaces';
import { Injectable } from '@nestjs/common';
import { sendEmail } from '../clients/aws/SES/send-email.ses';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

type Input = {
  email: string;
};

type Output = {
  code: string;
  error?: boolean;
};

export type ISendCodeConfirmation = UseCase<Input, Output>;

@Injectable()
export class SendCodeConfirmationEmail implements ISendCodeConfirmation {
  private readonly pathTemplate = path.join(
    __dirname,
    './templates/code-confirmation.template.hbs',
  );
  private readonly characters = '0123456789';
  private readonly lengthCode = 5;

  constructor() {}

  async perform(data: Input): Promise<Output> {
    const AWS_SES = sendEmail;
    const code = this.generateRandomCode(this.lengthCode);

    // const file = fs.readFileSync(this.pathTemplate, 'utf-8');

    const response = await AWS_SES({
      template: `<html> code: ${code} </html>`,
      to: data.email,
      subject: 'Code confirmation',
    });

    return {
      code,
      error: response?.error,
    };
  }

  private generateRandomCode(length: number) {
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.characters.length);
      code += this.characters.charAt(randomIndex);
    }

    return code;
  }
}
