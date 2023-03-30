import { Injectable, Scope } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
    constructor(name: string) {
        super(name);
    }

    debug(message: any, context?: string): any {
        super.debug(message, context);
    }
}
