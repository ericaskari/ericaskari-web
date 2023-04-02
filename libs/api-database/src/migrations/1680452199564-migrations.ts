import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1680452199564 implements MigrationInterface {
    name = 'migrations1680452199564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity" DROP COLUMN "wateredAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity"
            ADD "wateredAt" TIMESTAMP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity" DROP COLUMN "wateredAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity"
            ADD "wateredAt" TIMESTAMP WITH TIME ZONE NOT NULL
        `);
    }

}
