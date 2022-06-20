import { Observable } from 'rxjs';
import { ContactRequest, ContactResponse } from '@ericaskari/shared/model';

// Auto generated file with generate:api npm command

export interface IContactService {
    sendContactForm: (bodyRequest: ContactRequest) => Promise<ContactResponse>;
}