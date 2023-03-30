import { DeleteResult, EntityManager, FindManyOptions, FindOneOptions, InsertResult, ObjectLiteral, Repository } from 'typeorm';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { validate } from 'class-validator';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { ClassValidatorUtility, FormValidationErrorException, NotFoundErrorException } from '@ericaskari/shared/common';

export interface RepositoryService<Entity, Model> {
    getAll(transactionalEntityManager?: EntityManager): Promise<Model[]>;
    find(options?: FindManyOptions<Entity>, transactionalEntityManager?: EntityManager): Promise<Model[]>;
    count(options: FindManyOptions<Entity>, transactionalEntityManager?: EntityManager): Promise<number>;
    save(model: Model, transactionalEntityManager?: EntityManager): Promise<Model>;
    upsert(model: Model, conflictPaths?: string[], transactionalEntityManager?: EntityManager): Promise<InsertResult>;
    patch(
        model: Model,
        findOptions: FindOneOptions<Entity>,
        allowedKeys: Partial<Record<`allow${Capitalize<keyof Partial<Model>>}Update`, boolean>>,
        transactionalEntityManager?: EntityManager
    ): Promise<Model>;
}

export abstract class RepositoryServiceImpl<Entity extends ObjectLiteral, Model extends object>
    implements RepositoryService<Entity, Model>
{
    protected constructor(
        protected readonly repository: Repository<Entity>,
        protected readonly entity: ClassConstructor<Entity>,
        protected readonly model: ClassConstructor<Model>,
        public readonly modelToEntity: (model: Model) => Entity,
        public readonly modelFromEntity: (entity: Entity) => Model
    ) {}

    public async getAll(transactionalEntityManager?: EntityManager): Promise<Model[]> {
        const find: Entity[] = transactionalEntityManager
            ? await transactionalEntityManager.find(this.entity)
            : await this.repository.find();

        return find.map((e) => this.modelFromEntity(e));
    }

    public async findOne(options: FindOneOptions<Entity>, transactionalEntityManager?: EntityManager): Promise<Model | null> {
        const find: Entity | null = transactionalEntityManager
            ? await transactionalEntityManager.findOne(this.entity, options)
            : await this.repository.findOne(options);

        return find ? this.modelFromEntity(find) : null;
    }

    public async find(options: FindManyOptions<Entity>, transactionalEntityManager?: EntityManager): Promise<Model[]> {
        const find: Entity[] = transactionalEntityManager
            ? await transactionalEntityManager.find(this.entity, options)
            : await this.repository.find(options);

        return find.map((e) => this.modelFromEntity(e));
    }

    public async delete(options: FindOptionsWhere<Entity>, transactionalEntityManager?: EntityManager): Promise<DeleteResult> {
        return transactionalEntityManager
            ? await transactionalEntityManager.delete(this.entity, options)
            : await this.repository.delete(options);
    }

    public async count(options: FindManyOptions<Entity>, transactionalEntityManager?: EntityManager): Promise<number> {
        return transactionalEntityManager
            ? await transactionalEntityManager.count(this.entity, options)
            : await this.repository.count(options);
    }

    public async save(model: Model, transactionalEntityManager?: EntityManager): Promise<Model> {
        const errors = await validate(model);

        if (errors.length > 0) throw new FormValidationErrorException(ClassValidatorUtility.validationErrorsToFormError(errors));

        const item: Entity = transactionalEntityManager
            ? await transactionalEntityManager.save(this.modelToEntity(model))
            : await this.repository.save(this.modelToEntity(model));
        return this.modelFromEntity(item);
    }

    public async upsert(model: Model, conflictPaths?: (keyof Model)[], transactionalEntityManager?: EntityManager): Promise<InsertResult> {
        const errors = await validate(model);

        if (errors.length > 0) throw new FormValidationErrorException(ClassValidatorUtility.validationErrorsToFormError(errors));

        const insertResult = transactionalEntityManager
            ? await transactionalEntityManager.upsert(this.entity, this.modelToEntity(model), {
                  conflictPaths: (conflictPaths as string[]) ?? [],
                  skipUpdateIfNoValuesChanged: true
              })
            : await this.repository.upsert(this.modelToEntity(model), {
                  conflictPaths: (conflictPaths as string[]) ?? [],
                  skipUpdateIfNoValuesChanged: false
              });

        return insertResult;
    }

    public async patch(
        model: Model,
        findOptions: FindOneOptions<Entity>,
        allowedKeys: Partial<Record<`allow${Capitalize<keyof Partial<Model>>}Update`, boolean>>,
        transactionalEntityManager?: EntityManager
    ): Promise<Model> {
        const dbEntity = transactionalEntityManager
            ? await transactionalEntityManager.findOne(this.entity, findOptions)
            : await this.repository.findOne(findOptions);

        if (!dbEntity) {
            throw new NotFoundErrorException();
        }

        const dbModel = this.modelFromEntity(dbEntity);

        {
            //  property protection
            Object.entries(model).forEach(([key, apiValue]) => {
                const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);
                const allowedKey = `allow${capitalKey}Update` as keyof typeof allowedKeys;

                if (allowedKeys[allowedKey]) {
                    dbModel[key as keyof Model] = apiValue as never;
                }
            });
        }

        const errors = await validate(model);

        if (errors.length > 0) {
            throw new FormValidationErrorException(ClassValidatorUtility.validationErrorsToFormError(errors));
        }

        const item: Entity = transactionalEntityManager
            ? await transactionalEntityManager.save(this.modelToEntity(model))
            : await this.repository.save(this.modelToEntity(model));

        return this.modelFromEntity(item);
    }
}
