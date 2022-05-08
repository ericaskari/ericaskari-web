import { Controller, Get, OnApplicationBootstrap, } from '@nestjs/common';
import { LoggerService } from "./logger.service";


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
    getVersion(): { version: string } {
        return {
            version: process.env.VERSION || 'local-development'
        }
    }

    onApplicationBootstrap(): void {
        this.logger.verbose(`BUILD_VERSION: ${ this.getVersion().version }`);
    }
}
