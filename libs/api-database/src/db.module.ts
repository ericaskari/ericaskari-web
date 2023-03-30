import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule , InjectDataSource} from '@nestjs/typeorm';
import { EnvironmentService } from '@ericaskari/api/common';
import { entities } from './entities';
import { DataSource } from 'typeorm';
import { repositories } from './repositories';

export const TypeOrmModuleForFeature = TypeOrmModule.forFeature(entities);

@Module({
    imports: [TypeOrmModuleForFeature],
    controllers: [],
    providers: [EnvironmentService, ...repositories],
    exports: [...repositories]
})
export class DbModule implements OnModuleInit {
    private logger = new Logger(DbModule.name);

    constructor(private environmentService: EnvironmentService,  @InjectDataSource() private datasource: DataSource) {}

    async onModuleInit(): Promise<void> {
        const migrations = await this.datasource.runMigrations({
            fake: this.environmentService.variables.APP_DATABASE_FAKE_MIGRATION,
            transaction: 'each',
        });
        this.logger.log(`Applied Database migrations: ${migrations.length}`)
        if (migrations.length > 0) {
            this.logger.log(migrations);
        }
    }
}
