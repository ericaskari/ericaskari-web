import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { MailService } from './services/mail.service';
import { EnvironmentService } from '@ericaskari/api/common';
import { AppValidationPipe } from './services/validation.pipe';

const sharedServices = [ContactService, MailService, EnvironmentService, AppValidationPipe];

@Module({
    imports: [],
    controllers: [],
    providers: [...sharedServices],
    exports: [...sharedServices]
})
export class CoreModule {}
