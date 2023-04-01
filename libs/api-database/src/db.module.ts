import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, InjectDataSource } from '@nestjs/typeorm';
import { EnvironmentService } from '@ericaskari/api/common';
import { entities } from './entities';
import { DataSource } from 'typeorm';
import { FlowerWateringEventEntityRepositoryService, repositories } from './repositories';
import { v4 as uuid } from 'uuid';

export const TypeOrmModuleForFeature = TypeOrmModule.forFeature(entities);

@Module({
    imports: [ TypeOrmModuleForFeature ],
    controllers: [],
    providers: [ EnvironmentService, ...repositories ],
    exports: [ ...repositories ]
})
export class DbModule implements OnModuleInit {
    private logger = new Logger(DbModule.name);

    constructor(private environmentService: EnvironmentService, @InjectDataSource() private datasource: DataSource, private repo: FlowerWateringEventEntityRepositoryService) {
    }

    async onModuleInit(): Promise<void> {
        const migrations = await this.datasource.runMigrations({
            fake: this.environmentService.variables.APP_DATABASE_FAKE_MIGRATION,
            transaction: 'each',
        });
        this.logger.log(`Applied Database migrations: ${ migrations.length }`)
        if (migrations.length > 0) {
            this.logger.log(migrations);
        }
        const d = 7 * 24 * 60;
        const minInMs = 60 * 1000;
        const now = new Date().getTime();

        const seedCount = new Array(d).fill(0)
            .map((_, i) => {
                const adcValue = Math.max(0, 32000 - ((i * 10) % d) - Math.trunc(Math.random() * 10));

                return {
                    time: new Date(now + i * minInMs),
                    adcValue: adcValue
                }
            });

        // console.log(seedCount.length)
        // for (const date of seedCount) {
        //     const saved = await this.repo.save(this.repo.modelFromRequest({
        //         flowerId: '760785aa-0f4d-4bb1-8240-5b4d77a73568',
        //         createdAt: new Date(),
        //         wateredAt: date.time,
        //         adcValue: date.adcValue,
        //         id: uuid()
        //     }));
        //     console.log(date.adcValue, saved.id)
        // }

    }
}
