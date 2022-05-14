import { Injectable } from "@nestjs/common";
import { createTransport } from 'nodemailer'
import { EnvironmentService } from "@ericaskari/api-common";

@Injectable()
export class MailService {
    transporter = createTransport({
        host: this.environmentService.NODE_MAILER_HOST,
        secure: this.environmentService.isProduction,
        port: this.environmentService.NODE_MAILER_PORT,
        auth: {
            user: this.environmentService.NODE_MAILER_AUTH_USER,
            pass: this.environmentService.NODE_MAILER_AUTH_PASS
        },
        tls: {
            rejectUnauthorized: this.environmentService.isProduction
        }
    });

    constructor(private environmentService: EnvironmentService) {
    }

    async sendContactMeEmail(fromEmail: string, name: string, subject: string, data: string) {
        return await this.transporter.sendMail({
            from: '"Mohammad Askari (Eric)" <me@ericaskari.com>',
            to: 'ericaskari@gmail.com',
            subject: subject,
            html: data
        })

    }


    sendEmail() {
        this.transporter.sendMail({
            from: '"Mohammad Askari (Eric)" <me@ericaskari.com>',
            to: 'ericaskari@gmail.com',
            subject: 'test API email',
            html: `Hello this is a test email`
        }).then(data => {
            console.log({ data })
        }).catch(err => {
            console.log({ err })
        })
    }
}
