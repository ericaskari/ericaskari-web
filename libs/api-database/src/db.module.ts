import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentService } from '@ericaskari/api/common';
import { entities } from './entities';

const sharedServices = [];
export const TypeOrmModuleForFeature = TypeOrmModule.forFeature(entities);

@Module({
    imports: [TypeOrmModuleForFeature],
    controllers: [],
    providers: [...sharedServices],
    exports: [...sharedServices]
})
export class DbModule implements OnModuleInit {
    private logger = new Logger(DbModule.name);

    constructor(private environmentService: EnvironmentService) {}

    async onModuleInit(): Promise<void> {
        // if (!this.environmentService.variables.ENABLE_MIGRATIONS) {
        //     this.logger.log(`Skipping migrations...`);
        //     return;
        // }
        //
        // await this.dbService.runMigrations();
    }
}
