import { plainToClass } from 'class-transformer';

export class ContactResponse {
    public static fromRequest(model: any): ContactResponse {
        return plainToClass(ContactResponse, model);
    }
}
