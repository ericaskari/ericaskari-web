import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateFlowerRequest {
    @IsString()
    secret: string;

    @IsString()
    name: string;

    static fromJson(json: Partial<CreateFlowerRequest>): CreateFlowerRequest {
        return plainToClass(CreateFlowerRequest, json);
    }
}
