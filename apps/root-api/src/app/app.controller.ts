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
        const dateAfter = new Date(Date.now() - 604_800_000).toISOString().split('T')[0];
        const query = `SELECT DATE_TRUNC('hour', "wateredAt") time, AVG("adcValue") value
                       FROM flower_watering_event_entity
                       WHERE "wateredAt" >= '${ dateAfter }'
                       GROUP BY DATE_TRUNC('hour', "wateredAt")
                       ORDER BY DATE_TRUNC('hour', "wateredAt") ASC
        `
        const results: WaterEvent[] = await this.flowerWateringEventEntityRepositoryService.repository.query(query);

        return GetWaterLevelResponse.fromJson({
            items: results.map((item) => {
                item.value = Math.trunc(item.value);
                return item;
            })
        })
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
