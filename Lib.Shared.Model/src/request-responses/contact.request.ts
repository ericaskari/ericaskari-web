import { IsEmail, IsString } from "class-validator";
import { plainToClass } from "class-transformer";

export class ContactRequest {
    @IsEmail()
    email!: string;

    @IsString()
    name!: string;

    @IsString()
    subject!: string;

    @IsString()
    message!: string;


    public static fromRequest(model: Partial<ContactRequest>): ContactRequest {
        return plainToClass(ContactRequest, model);
    }
}
