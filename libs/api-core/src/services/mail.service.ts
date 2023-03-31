import { EnvironmentService } from '@ericaskari/api/common';
import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
    transporter = createTransport({
        host: this.environmentService.variables.APP_NODE_MAILER_HOST,
        secure: this.environmentService.variables.APP_NODE_MAILER_SECURE,
        port: this.environmentService.variables.APP_NODE_MAILER_PORT,
        auth: {
            user: this.environmentService.variables.APP_NODE_MAILER_AUTH_USER,
            pass: this.environmentService.variables.APP_NODE_MAILER_AUTH_PASS
        },
        tls: {
            rejectUnauthorized: this.environmentService.variables.APP_NODE_MAILER_REJECT_UNAUTHORIZED
        }
    });

    constructor(private environmentService: EnvironmentService) {}

    async sendContactMeEmail(fromEmail: string, name: string, subject: string, data: string) {
        return await this.transporter.sendMail({
            from: '"Mohammad Askari (Eric)" <me@ericaskari.com>',
            to: 'ericaskari@gmail.com',
            subject: `Contact me form entry ${new Date().toDateString()}`,
            html: `
            <p>From: <b>${fromEmail}</b></p>
            <p>Name: <b>${name}</b></p>
            <p>Subject: <b>${subject}</b></p>
            <div>${data}</div>
            `
        });
    }
}
