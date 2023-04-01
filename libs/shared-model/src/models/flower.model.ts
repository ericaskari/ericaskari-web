import { plainToClass, Transform, Type } from "class-transformer";
import { IsDate, IsString, IsUUID } from "class-validator";

export class FlowerModel {
    @IsUUID()
    id!: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    createdAt!: Date;

    @IsString()
    name!: string;

    public static fromRequest(model: Partial<FlowerModel>): FlowerModel {
        return plainToClass(FlowerModel, model);
    }
}
