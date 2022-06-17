import { CommonModule } from '@ericaskari/api-common';
import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './logger.service';
import { MailService } from './mail.service';

@Module({
    imports: [HttpModule, CommonModule],
    controllers: [AppController],
    providers: [AppService, LoggerService, MailService],
})
export class AppModule {}
