import { plainToClass, Transform, Type } from "class-transformer";
import { IsDate, IsNumber, IsObject, IsOptional, IsString, IsUUID } from "class-validator";

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
