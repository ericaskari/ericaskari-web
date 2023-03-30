import { plainToClass } from 'class-transformer';
import { FlowerModel } from '../models/flower.model';

export class CreateFlowerResponse {
    flower: FlowerModel;

    static fromJson(json: Partial<CreateFlowerResponse>): CreateFlowerResponse {
        return plainToClass(CreateFlowerResponse, json);
    }
}
