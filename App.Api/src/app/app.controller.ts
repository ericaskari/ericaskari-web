import { Controller, Get, OnApplicationBootstrap, } from '@nestjs/common';
import { LoggerService } from "./logger.service";
import { BootstrapResponseModel } from "@ericaskari/model";


@Controller()
export class AppController implements OnApplicationBootstrap {
    constructor(private logger: LoggerService) {
        this.logger.setContext(AppController.name);
    }

    @Get('/healthcheck')
    getData() {
        return {};
    }

    @Get('/version')
    getVersion(): BootstrapResponseModel {
        return BootstrapResponseModel.fromJson({
            version: process.env.VERSION
        });
    }

    onApplicationBootstrap(): void {
        this.logger.verbose(`BUILD_VERSION: ${ this.getVersion().version }`);
    }
}
