import { plainToClass } from 'class-transformer';

export class SaveWaterLevelResponse {
    static fromJson(json: Partial<SaveWaterLevelResponse>): SaveWaterLevelResponse {
        return plainToClass(SaveWaterLevelResponse, json);
    }
}
