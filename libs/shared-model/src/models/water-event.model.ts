import { plainToClass } from "class-transformer";

export class WaterEvent {
    time!: string;

    value!: number;

    public static fromRequest(model: Partial<WaterEvent>): WaterEvent {
        return plainToClass(WaterEvent, model);
    }
}
