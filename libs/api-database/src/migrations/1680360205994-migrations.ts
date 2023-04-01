import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1680360205994 implements MigrationInterface {
    name = 'migrations1680360205994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity"
            ADD "wateredAt" TIMESTAMP WITH TIME ZONE NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity" DROP COLUMN "wateredAt"
        `);
    }

}
