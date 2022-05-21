import { EnvironmentService } from '@ericaskari/api-common';
import { ContactRequest, ContactResponse, GetVersionResponse } from '@ericaskari/model';
import { Body, Controller, Get, OnApplicationBootstrap, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { LoggerService } from './logger.service';

@Controller()
export class AppController implements OnApplicationBootstrap {
    constructor(
        private logger: LoggerService,
        private environmentService: EnvironmentService,
        private appService: AppService
    ) {
        this.logger.setContext(AppController.name);
    }

    @Get('/healthcheck')
    getData() {
        return {};
    }

    @Post('/contact')
    public async contact(@Body() request: ContactRequest): Promise<ContactResponse> {
        console.log(request);
        return await this.appService.contact(request);
    }

    @Get('/version')
    getVersion(): GetVersionResponse {
        const response = new GetVersionResponse();

        response.buildVersion = this.environmentService.BUILD_VERSION;

        console.log(response);

        return response;
    }

    onApplicationBootstrap(): void {
        this.logger.verbose(`BUILD_VERSION: ${this.environmentService.BUILD_VERSION}`);
    }
}
