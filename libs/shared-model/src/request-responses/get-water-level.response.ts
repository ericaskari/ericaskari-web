import { plainToClass } from 'class-transformer';
import { WaterEvent } from '../models/water-event.model';

export class GetWaterLevelResponse {
    items!: WaterEvent[];

    static fromJson(json: Partial<GetWaterLevelResponse>): GetWaterLevelResponse {
        return plainToClass(GetWaterLevelResponse, json);
    }
}
