import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string) {
    const url = `https://officebooker.co.za/guest-registration`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Office Booker" <support@example.com>', // override default from
      subject: 'Welcome to Office Booker!',
      html: '<!DOCTYPE html><html><head><link href=\'https://fonts.googleapis.com/css?family=Maven Pro\' rel=\'stylesheet\'><style>body {font-family: \'Maven Pro\';font-size: 22px;}</style></head><body><h1>Office Booker</h1><p>You have been invited to join Office Booker as a guest, click the button below to register a guest account. If you did not request access, ignore this email.</p><a href="https://officebooker.co.za/guest-registration"><button type="button" class="button">Guest Registration</button></a><style>.button {border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;background-color: rgb(64,76,166);border-radius: 7px;}</style></body></html>', 
      context: {
        name: 'Kryptos Kode',
        url,
      },
    });
  }
}
