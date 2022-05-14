import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

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

    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }

    await app.listen(port, hostname, () => {
        Logger.log(`Listening at http://${ hostname }:${ port }/${ globalPrefix }`);
    });

}

bootstrap();
