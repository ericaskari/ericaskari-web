import { plainToClass } from 'class-transformer';
import { FlowerWateringEventModel } from '@ericaskari/shared/model';

export class SaveWaterLevelResponse {
    flowerWateringEvent: FlowerWateringEventModel;

    static fromJson(json: Partial<SaveWaterLevelResponse>): SaveWaterLevelResponse {
        return plainToClass(SaveWaterLevelResponse, json);
    }
}
