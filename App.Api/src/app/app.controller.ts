import { Body, Controller, Get, OnApplicationBootstrap, Post, } from '@nestjs/common';
import { LoggerService } from "./logger.service";
import { EnvironmentService } from "@ericaskari/api-common";
import { ContactRequest, ContactResponse } from "@ericaskari/model";
import { AppService } from "./app.service";


@Controller()
export class AppController implements OnApplicationBootstrap {
    constructor(private logger: LoggerService, private environmentService: EnvironmentService, private appService: AppService) {
        this.logger.setContext(AppController.name);
    }

    @Get('/healthcheck')
    getData() {
        return {};
    }

    @Post('/contact')
    public async contact(@Body() request: ContactRequest): Promise<ContactResponse> {
        console.log(request)
        return await this.appService.contact(request);
    }

    @Get('/version')
    getVersion(): { buildVersion: string, runtimeVersion: string } {
        console.log({
            buildVersion: this.environmentService.BUILD_VERSION,
            runtimeVersion: this.environmentService.RUNTIME_VERSION,
        })
        return {
            buildVersion: this.environmentService.BUILD_VERSION,
            runtimeVersion: this.environmentService.RUNTIME_VERSION,
        }
    }

    onApplicationBootstrap(): void {
        this.logger.verbose(`RUNTIME_VERSION: ${ this.environmentService.RUNTIME_VERSION }`);
        this.logger.verbose(`BUILD_VERSION: ${ this.environmentService.BUILD_VERSION }`);
    }
}
