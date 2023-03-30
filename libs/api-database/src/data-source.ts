import { DataSource } from 'typeorm';
import { typeOrmModuleOptions } from './typeorm-module-options';

export const AppDataSource: DataSource = new DataSource(typeOrmModuleOptions);
