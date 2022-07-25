import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
// @ts-ignore
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {

    await this.mailerService.sendMail({
      to: "u20460687@tuks.co.za",
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: "Ying",
        url: "http://localhost:4200/",
      },
    });
  }
}
