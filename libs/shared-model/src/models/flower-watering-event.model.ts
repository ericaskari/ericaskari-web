import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsObject, IsOptional, IsUUID } from 'class-validator';
import { FlowerModel } from '../models';

export class FlowerWateringEventModel {
    @IsUUID()
    id!: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    createdAt!: Date;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    wateredAt!: Date;

    @IsNumber()
    @Type(() => Number)
    adcValue!: number;

    @IsObject()
    @IsOptional()
    @Type(() => FlowerModel)
    flower!: FlowerModel | null | undefined;

    @IsUUID()
    flowerId!: string;

}
