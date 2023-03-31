import { EnvironmentService } from '@ericaskari/api/common';
import { DataSourceOptions } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';

export const typeOrmModuleOptions: DataSourceOptions = {
    type: 'postgres',
    host: EnvironmentService.getInstance.variables.APP_DATABASE_HOST,
    port: EnvironmentService.getInstance.variables.APP_DATABASE_PORT,
    username: EnvironmentService.getInstance.variables.APP_DATABASE_USER,
    password: EnvironmentService.getInstance.variables.APP_DATABASE_PASSWORD,
    database: EnvironmentService.getInstance.variables.APP_DATABASE_NAME,
    useUTC: true,
    migrationsTableName: 'migration',
    entities,
    migrations,
    ssl: EnvironmentService.getInstance.isProduction
};

// export const typeOrmTestModuleOptions: TypeOrmModuleOptions = {
//     ...typeOrmModuleOptions,
//     host: EnvironmentService.getInstance.variables.TEST_DATABASE_HOST,
//     port: EnvironmentService.getInstance.variables.TEST_DATABASE_PORT,
//     username: EnvironmentService.getInstance.variables.TEST_DATABASE_USER,
//     password: EnvironmentService.getInstance.variables.TEST_DATABASE_PASSWORD,
//     database: EnvironmentService.getInstance.variables.TEST_DATABASE_NAME
// };
