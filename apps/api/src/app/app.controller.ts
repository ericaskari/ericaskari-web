import { EnvironmentService } from '@ericaskari/api/common';
import { GetVersionResponse } from '@ericaskari/shared/model';
import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '@ericaskari/api/core';

@Controller()
export class AppController {
    private logger = new LoggerService(AppController.name);

    constructor(private environmentService: EnvironmentService) {}

    @Get('/runtime-environment')
    getVersion(): GetVersionResponse {
        return GetVersionResponse.fromJson({
            buildVersion: this.environmentService.environment.APP_BUILD_VERSION
        });
    }
}
