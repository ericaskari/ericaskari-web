
import { Injectable } from '@nestjs/common';
import { RepositoryServiceImpl } from '../repository.service';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowerEntity } from '../entities';
import { FlowerModel } from '@ericaskari/shared/model';

@Injectable()
export class FlowerEntityRepositoryService extends RepositoryServiceImpl<
    FlowerEntity,
    FlowerModel
> {
    constructor(@InjectRepository(FlowerEntity) override repository: Repository<FlowerEntity>) {
        super(
            repository,
            FlowerEntity,
            FlowerModel,
            (model: FlowerModel) => plainToClass(FlowerEntity, model),
            (model: FlowerEntity) => plainToClass(FlowerModel, model),
            (model: Partial<FlowerEntity>) => plainToClass(FlowerModel, model),
        );
    }
}
