import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { formatDate } from 'src/common/helpers/formatDate';

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

  async sendLabsEmail(to: string, patientName: string, labDate: Date) {
    const formattedDate = formatDate(labDate);
    await this.mailerService.sendMail({
      to: to,
      from: 'info@incorcentromedico.com.ar',
      subject: 'Incor - Aviso de Informes',
      template: './labs',
      context: {
        nombre: patientName,
        fecha: formattedDate,
      },
    });
  }
}
