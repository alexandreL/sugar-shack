import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialisation1702142326092 implements MigrationInterface {
    name = 'Initialisation1702142326092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar NOT NULL, "email" varchar NOT NULL, "hashed_password" varchar NOT NULL)')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "users"')
    }

}
