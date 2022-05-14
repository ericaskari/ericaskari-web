import { Module } from '@nestjs/common';
import { EnvironmentService } from './services/environment.service';

const sharedServices = [EnvironmentService];

@Module({
    imports: [],
    controllers: [],
    providers: [...sharedServices],
    exports: [...sharedServices]
})
export class CommonModule {
    constructor() {}
}
