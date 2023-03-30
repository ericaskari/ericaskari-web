import { IContactService } from '@ericaskari/api/common';
import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';
import { ContactResponse } from '@ericaskari/shared/model';

@Injectable()
export class ContactService implements IContactService {
    constructor(private mailService: MailService) {}

    async sendContactForm(bodyRequest): Promise<ContactResponse> {
        await this.mailService.sendContactMeEmail(bodyRequest.email, bodyRequest.name, bodyRequest.subject, bodyRequest.message);
        return new ContactResponse();
    }
}
