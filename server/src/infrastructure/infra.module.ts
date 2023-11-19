import { Module } from '@nestjs/common';
import { SendCodeConfirmationEmail } from './mail/send-code-confirmation.email';

@Module({
  exports: [
    {
      provide: 'send-confirmation-code',
      useClass: SendCodeConfirmationEmail,
    },
  ],
  providers: [
    {
      provide: 'send-confirmation-code',
      useClass: SendCodeConfirmationEmail,
    },
  ],
})
export class InfraModule {}
