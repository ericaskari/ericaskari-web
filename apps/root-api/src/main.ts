import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { EnvironmentService } from '@ericaskari/api/common';
import { json, urlencoded } from 'body-parser';
import { AppValidationPipe, HttpExceptionFilter } from '@ericaskari/api/core';
import { models, requestResponseModels } from '@ericaskari/shared/model';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

process.on('SIGINT', () => {
    console.info('Interrupted');
    process.exit(0);
});

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';

    app.setGlobalPrefix(globalPrefix);
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    // app.useGlobalPipes(app.get(AppValidationPipe));

    if (app.get(EnvironmentService).environment.APP_ENABLE_SWAGGER) {
        const documentBuilder = new DocumentBuilder().setVersion(app.get(EnvironmentService).environment.APP_BUILD_VERSION).build();

        const document = SwaggerModule.createDocument(app, documentBuilder, {
            extraModels: [...models, ...requestResponseModels]
        });

        SwaggerModule.setup(`swagger`, app, document);
    }

    const port = 8000;

    const hostname = '0.0.0.0';

    logger.log(`APP_NODE_ENV: ${app.get(EnvironmentService).environment.APP_NODE_ENV}`);
    logger.log(`APP_BUILD_VERSION: ${app.get(EnvironmentService).environment.APP_BUILD_VERSION}`);

    app.get(EnvironmentService).init();

    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }

    await app.listen(8000, '0.0.0.0', () => {
        logger.log(`Server Listening at ${app.get(EnvironmentService).SERVER_URL}/${globalPrefix}`);

        if (app.get(EnvironmentService).environment.APP_ENABLE_SWAGGER)
            logger.log(`Swagger docs at ${app.get(EnvironmentService).SERVER_URL}/swagger`);
        if (app.get(EnvironmentService).isLocalDevelopment) logger.log(`View Emails at ${app.get(EnvironmentService).SERVER_URL}/mailhog`);
        if (app.get(EnvironmentService).isLocalDevelopment)
            logger.log(`View Email templates at ${app.get(EnvironmentService).SERVER_URL}/${globalPrefix}/email-templates`);
    });
}

bootstrap();
