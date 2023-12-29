import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'info@incorcentromedico.com.ar',
          pass: 'Cardiology2023!',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@incorcentromedico.com.ar>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
