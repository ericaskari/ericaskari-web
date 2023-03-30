import { EnvironmentService } from '@ericaskari/api/common';
import { GetVersionResponse, SaveWaterLevelRequest, SaveWaterLevelResponse } from '@ericaskari/shared/model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from '@ericaskari/api/core';

@Controller()
export class AppController {
    private logger = new LoggerService(AppController.name);

    constructor(private environmentService: EnvironmentService) {}

    @Get('/runtime-environment')
    getVersion(): GetVersionResponse {
        return GetVersionResponse.fromJson({
            buildVersion: this.environmentService.variables.APP_BUILD_VERSION
        });
    }

    @Post('/water-level')
    saveWaterLevel(@Body() request: SaveWaterLevelRequest): SaveWaterLevelResponse {
        return SaveWaterLevelResponse.fromJson({});
    }
}
