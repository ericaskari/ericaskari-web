import { ContactRequest, ContactResponse } from '@ericaskari/model';
import { Injectable } from '@nestjs/common';

import { MailService } from './mail.service';

@Injectable()
export class AppService {
    constructor(private mailService: MailService) {}

    getData(): { message: string } {
        return { message: 'Welcome to App.Api!' };
    }

    public async contact(request: ContactRequest): Promise<ContactResponse> {
        await this.mailService.sendContactMeEmail(request.email, request.name, request.subject, request.message);
        return new ContactResponse();
    }
}
