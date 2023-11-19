import AWS_SES from '../connection';
import { AwsSesConfig } from '../../../../@config/aws-ses.config';

export interface ISendEmailIn {
  to: string;
  template: string;
  subject: string;
}

export async function sendEmail(input: ISendEmailIn) {
  const payload = {
    Destination: {
      ToAddresses: [input.to],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: input.template,
        },
        Text: {
          Charset: 'UTF-8',
          Data: input.template,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: input.subject,
      },
    },
    Source: AwsSesConfig.EmailSender,
  };

  try {
    await AWS_SES.sendEmail(payload).promise();
  } catch (e) {
    console.error(e);
    return {
      error: e.message,
    };
  }
}
