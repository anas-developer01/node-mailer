import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendMail(email: string, name: string) {
        console.log(email,"============>")
        await this.mailerService.sendMail({
            to: 'anasrasool702@gmail.com',
            subject: 'Greeting from NestJS NodeMailer',
            template: 'email',
            context: {
                name: name
            }
        })
    }
}