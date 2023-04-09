import { EnvironmentService } from '@ericaskari/api/common';
import {
    CreateFlowerRequest,
    CreateFlowerResponse,
    GetVersionResponse, GetWaterLevelResponse,
    SaveWaterLevelRequest,
    SaveWaterLevelResponse, WaterEvent
} from '@ericaskari/shared/model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from '@ericaskari/api/core';
import { NotFoundErrorException, UnauthorizedException } from "@ericaskari/shared/common";
import {
    FlowerEntityRepositoryService,
    FlowerWateringEventEntityRepositoryService
} from "@ericaskari/api/database";
import { v4 as uuid } from 'uuid';

@Controller()
export class AppController {
    private logger = new LoggerService(AppController.name);

    constructor(private environmentService: EnvironmentService, private flowerWateringEventEntityRepositoryService: FlowerWateringEventEntityRepositoryService, private flowerEntityRepositoryService: FlowerEntityRepositoryService) {
    }

    @Get('/runtime-environment')
    getVersion(): GetVersionResponse {
        return GetVersionResponse.fromJson({
            buildVersion: this.environmentService.variables.APP_BUILD_VERSION
        });
    }

    @Get('/water-events')
    async fetchWateringEvents(): Promise<GetWaterLevelResponse> {
        const queries: { name: keyof GetWaterLevelResponse, query: string; }[] =
            [
                {
                    name: 'allTime',
                    query: `SELECT DATE_TRUNC('hour', "wateredAt") time, AVG("adcValue") value
                            FROM flower_watering_event_entity
                            GROUP BY DATE_TRUNC('hour', "wateredAt")
                            ORDER BY DATE_TRUNC('hour', "wateredAt") ASC
                    `
                },
                {
                    name: 'last30Days',
                    query: `SELECT DATE_TRUNC('hour', "wateredAt") time, AVG("adcValue") value
                            FROM flower_watering_event_entity
                            WHERE "wateredAt" >= NOW() - '30 day'::INTERVAL
                            GROUP BY DATE_TRUNC('hour', "wateredAt")
                            ORDER BY DATE_TRUNC('hour', "wateredAt") ASC
                    `
                },
                {
                    name: 'last7Days',
                    query: `SELECT DATE_TRUNC('hour', "wateredAt") time, AVG("adcValue") value
                            FROM flower_watering_event_entity
                            WHERE "wateredAt" >= NOW() - '7 day'::INTERVAL
                            GROUP BY DATE_TRUNC('hour', "wateredAt")
                            ORDER BY DATE_TRUNC('hour', "wateredAt") ASC
                    `
                },
                {
                    name: 'last24Hours',
                    query: `SELECT DATE_TRUNC('hour', "wateredAt") time, AVG("adcValue") value
                            FROM flower_watering_event_entity
                            WHERE "wateredAt" >= NOW() - '1 day'::INTERVAL
                            GROUP BY DATE_TRUNC('hour', "wateredAt")
                            ORDER BY DATE_TRUNC('hour', "wateredAt") ASC
                    `
                }
            ]
        const queryResults: { name: string, result: { value: number, time: string }[]; }[] =
            await Promise.all(queries.map(
                async ({ query, name }) => {
                    return {
                        name,
                        result: await this.flowerWateringEventEntityRepositoryService.repository.query(query).catch(err => {
                            console.log(err);
                            return []
                        })
                    }
                }
            ))

        const output: Record<string, any> = queryResults.reduce((previousValue, currentValue) => {
            previousValue[currentValue.name] = currentValue.result.map((item) => {
                item.value = Math.abs(Math.trunc(item.value) - 65535)
                return item;
            });
            return previousValue;
        }, {});
        return GetWaterLevelResponse.fromJson(output)
    }

    @Post('/water-level')
    async saveWaterLevel(@Body() request: SaveWaterLevelRequest): Promise<SaveWaterLevelResponse> {
        const { secret, flowerId, adcValue, wateredAt } = request;

        if (secret !== this.environmentService.variables.APP_FLOWER_API_SECRET) {
            throw new UnauthorizedException()
        }
        const flower = await this.flowerEntityRepositoryService.findOne({
            where: {
                id: flowerId
            }
        });

        if (!flower) {
            throw new NotFoundErrorException();
        }

        const flowerWateringEvent = await this.flowerWateringEventEntityRepositoryService.save({
            adcValue: adcValue,
            flowerId,
            createdAt: new Date(),
            wateredAt: new Date(wateredAt),
            id: uuid()
        });

        return SaveWaterLevelResponse.fromJson({ flowerWateringEvent });
    }

    @Post('/add-flower')
    async addFlower(@Body() request: CreateFlowerRequest): Promise<CreateFlowerResponse> {
        const { name, secret } = request;

        if (secret !== this.environmentService.variables.APP_FLOWER_API_SECRET) {
            throw new UnauthorizedException()
        }
        const flower = await this.flowerEntityRepositoryService.save({
            name,
            id: uuid(),
            createdAt: new Date()
        });


        return CreateFlowerResponse.fromJson({
            flower: this.flowerEntityRepositoryService.modelFromEntity(flower),
        });
    }
}
