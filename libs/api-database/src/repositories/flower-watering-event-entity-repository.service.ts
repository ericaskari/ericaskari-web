
import { Injectable } from '@nestjs/common';
import { RepositoryServiceImpl } from '../repository.service';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowerWateringEventEntity } from '../entities';
import { FlowerWateringEventModel } from '@ericaskari/shared/model';

@Injectable()
export class FlowerWateringEventEntityRepositoryService extends RepositoryServiceImpl<
    FlowerWateringEventEntity,
    FlowerWateringEventModel
> {
    constructor(@InjectRepository(FlowerWateringEventEntity) override repository: Repository<FlowerWateringEventEntity>) {
        super(
            repository,
            FlowerWateringEventEntity,
            FlowerWateringEventModel,
            (model: FlowerWateringEventModel) => plainToClass(FlowerWateringEventEntity, model),
            (model: FlowerWateringEventEntity) => plainToClass(FlowerWateringEventModel, model),
            (model: Partial<FlowerWateringEventEntity>) => plainToClass(FlowerWateringEventModel, model),
        );
    }
}
