import { Controller, Get, OnApplicationBootstrap, } from '@nestjs/common';
import { LoggerService } from "./logger.service";
import { EnvironmentService } from "@ericaskari/api-common";


@Controller()
export class AppController implements OnApplicationBootstrap {
    constructor(private logger: LoggerService, private environmentService: EnvironmentService) {
        this.logger.setContext(AppController.name);
    }

    @Get('/healthcheck')
    getData() {
        return {};
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
