import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1680214799396 implements MigrationInterface {
    name = 'migrations1680214799396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "flower_entity" DROP COLUMN "adcValue"
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_entity" DROP COLUMN "flowerId"
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_entity"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity"
            ADD "adcValue" integer NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity" DROP COLUMN "adcValue"
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_entity" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_entity"
            ADD "flowerId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_entity"
            ADD "adcValue" integer NOT NULL
        `);
    }

}
