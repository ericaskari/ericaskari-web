import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from '@ericaskari/api/persistence';

// Auto generated file with generate:exports npm command

export const TypeOrmModuleForFeature = TypeOrmModule.forFeature(entities);

type RepositoryDefinition = () => (target: object, key: string | symbol, index?: number | undefined) => void;
