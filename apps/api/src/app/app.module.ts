import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { generatedControllers } from './generated-controllers';
import { CoreModule } from '@ericaskari/api/core';

@Module({
    imports: [HttpModule, CoreModule],
    controllers: [AppController, ...generatedControllers],
    providers: []
})
export class AppModule {}
