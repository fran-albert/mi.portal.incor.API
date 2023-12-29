import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {

  constructor(private mailerService: MailerService) {}

  async sendResetPasswordEmail(to: string, token: string) {
    const url = `http://localhost:3000/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: to,
      from: 'info@incorcentromedico.com.ar',
      subject: 'Incor - Restablecer Contraseña',
      template: './reset-password',
      context: {
        url,
      },
    });
  }
}
