import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { generatedControllers } from './generated-controllers';
import { CoreModule } from '@ericaskari/api/core';
import { typeOrmModuleOptions } from '@ericaskari/api/database';

@Module({
    imports: [HttpModule, CoreModule, TypeOrmModule.forRoot(typeOrmModuleOptions)],
    controllers: [AppController, ...generatedControllers],
    providers: []
})
export class AppModule {}
