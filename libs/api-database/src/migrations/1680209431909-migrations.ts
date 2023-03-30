import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1680209431909 implements MigrationInterface {
    name = 'migrations1680209431909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "flower_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "adcValue" integer NOT NULL,
                "flowerId" uuid NOT NULL,
                CONSTRAINT "PK_fb818395e7beadd3f348020d33b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "flower_watering_event_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "flower_id" uuid NOT NULL,
                CONSTRAINT "PK_24533a85f9c4df67d796e5153e2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity"
            ADD CONSTRAINT "FK_00d812b373a63308510bca8f12d" FOREIGN KEY ("flower_id") REFERENCES "flower_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "flower_watering_event_entity" DROP CONSTRAINT "FK_00d812b373a63308510bca8f12d"
        `);
        await queryRunner.query(`
            DROP TABLE "flower_watering_event_entity"
        `);
        await queryRunner.query(`
            DROP TABLE "flower_entity"
        `);
    }

}
