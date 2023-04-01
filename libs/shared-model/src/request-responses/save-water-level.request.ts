import { IsNumber, IsString, IsUUID } from 'class-validator';

export class SaveWaterLevelRequest {
    @IsString()
    secret!: string;

    @IsUUID()
    flowerId!: string;

    @IsNumber()
    adcValue!: number;

    @IsNumber()
    wateredAt!: number;
}
