import { EnvironmentService } from '@ericaskari/api/common';
import {
    CreateFlowerRequest,
    CreateFlowerResponse,
    GetVersionResponse,
    SaveWaterLevelRequest,
    SaveWaterLevelResponse
} from '@ericaskari/shared/model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from '@ericaskari/api/core';
import { NotFoundErrorException, UnauthorizedException } from "@ericaskari/shared/common";
import {
    FlowerEntityRepositoryService,
    FlowerWateringEventEntityRepositoryService
} from "@ericaskari/api/database";

@Controller()
export class AppController {
    private logger = new LoggerService(AppController.name);

    constructor(private environmentService: EnvironmentService, private flowerWateringEventEntityRepositoryService: FlowerWateringEventEntityRepositoryService, private flowerEntityRepositoryService: FlowerEntityRepositoryService) {}

    @Get('/runtime-environment')
    getVersion(): GetVersionResponse {
        return GetVersionResponse.fromJson({
            buildVersion: this.environmentService.variables.APP_BUILD_VERSION
        });
    }

    @Post('/water-level')
    async saveWaterLevel(@Body() request: SaveWaterLevelRequest): Promise<SaveWaterLevelResponse> {
        const {secret, flowerId, adcValue} = request;

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
            flowerId
        });

        return SaveWaterLevelResponse.fromJson({flowerWateringEvent});
    }

    @Post('/add-flower')
    async addFlower(@Body() request: CreateFlowerRequest): Promise<CreateFlowerResponse> {
        const {name, secret} = request;

        if (secret !== this.environmentService.variables.APP_FLOWER_API_SECRET) {
            throw new UnauthorizedException()
        }
        const flower = await this.flowerEntityRepositoryService.save({
            name
        });


        return CreateFlowerResponse.fromJson({
            flower: this.flowerEntityRepositoryService.modelFromEntity(flower),
        });
    }
}
