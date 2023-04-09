import { plainToClass } from 'class-transformer';
import { WaterEvent } from '../models/water-event.model';

export class GetWaterLevelResponse {
    allTime!: WaterEvent[];
    last30Days!: WaterEvent[];
    last7Days!: WaterEvent[];
    last24Hours!: WaterEvent[];

    static fromJson(json: Partial<GetWaterLevelResponse>): GetWaterLevelResponse {
        return plainToClass(GetWaterLevelResponse, json);
    }
}
