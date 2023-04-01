import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FlowerEntity } from './flower.entity';

@Entity()
export class FlowerWateringEventEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: 'timestamp with time zone' })
    wateredAt!: Date;

    @Column({ type: 'integer' })
    adcValue!: number;

    @ManyToOne(() => FlowerEntity, { eager: false, nullable: false })
    @JoinColumn({ name: 'flower_id' })
    flower!: FlowerEntity | null | undefined;

    @Column({ name: 'flower_id' })
    flowerId!: string;
}
