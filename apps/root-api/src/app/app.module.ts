import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { generatedControllers } from './generated-controllers';
import { CoreModule } from '@ericaskari/api/core';
import { DbModule, typeOrmModuleOptions } from '@ericaskari/api/database';
import { EnvironmentService } from '@ericaskari/api/common';

@Module({
    imports: [HttpModule, CoreModule, DbModule, TypeOrmModule.forRoot(typeOrmModuleOptions)],
    controllers: [AppController, ...generatedControllers],
    providers: [EnvironmentService],
    exports: [EnvironmentService]
})
export class AppModule {}
