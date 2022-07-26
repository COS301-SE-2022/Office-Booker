import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string) {
    const url = `http://localhost:4200`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Office Booker" <support@example.com>', // override default from
      subject: 'Welcome to Office Booker!',
      html: '<p>You have been invited to office booker</p><p>Click the link to join: </p><a href="www.youtube.com">Click</a>', 
      context: { // ✏️ filling curly brackets with content
        name: 'Ying',
        url,
      },
    });
  }
}
