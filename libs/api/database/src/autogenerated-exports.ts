import { plainToClass } from 'class-transformer';

import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';

import { 
    entities,    
} from '@ericaskari/api/persistence';

import { 
     } from '@ericaskari/shared/model';

import { Repository } from 'typeorm';

import { EntityExposure } from "@ericaskari/shared/enum";

// Auto generated file with generate:exports npm command

export const TypeOrmModuleForFeature = TypeOrmModule.forFeature(entities);

type RepositoryDefinition = () => (target: object, key: string | symbol, index?: number | undefined) => void;







