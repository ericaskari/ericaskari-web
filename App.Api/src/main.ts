import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { config as dotenvConfig  } from 'dotenv';
import { EnvironmentService } from "./environment/environment.service";

process.on('SIGINT', () => {
    console.info("Interrupted");
    process.exit(0);
});

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    const globalPrefix = 'api';

    app.setGlobalPrefix(globalPrefix);

    const port = 8000;

    const hostname = '0.0.0.0';

    Logger.log(`process.env.NODE_ENV: ${ process.env.NODE_ENV }`);

    app.get<EnvironmentService>(EnvironmentService).init();

    await app.listen(port, hostname, () => {
        Logger.log(`Listening at http://${ hostname }:${ port }/${ globalPrefix }`);
    });

}

bootstrap();
