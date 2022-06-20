import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { EntityExposure } from '@ericaskari/shared/enum';

export abstract class BaseEntity {
    @Expose({ groups: [EntityExposure.toSave, EntityExposure.toUpdate] })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Expose({ groups: [EntityExposure.toSave, EntityExposure.toUpdate] })
    @CreateDateColumn()
    createdAt!: Date;

    @Expose({ groups: [EntityExposure.toSave, EntityExposure.toUpdate] })
    @UpdateDateColumn()
    updatedAt!: Date;
}
