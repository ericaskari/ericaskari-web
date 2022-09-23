import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { generatedControllers } from './generated-controllers';
import { CoreModule } from '@ericaskari/api/core';
import { MeetController } from './meet/meet.controller';
import { MeetEventsGateway } from './meet/meet-events.gateway';
import { MeetService } from './meet/meet.service';

@Module({
    imports: [HttpModule, CoreModule],
    controllers: [AppController, MeetController, ...generatedControllers],
    providers: [MeetEventsGateway, MeetService]
})
export class AppModule {}
