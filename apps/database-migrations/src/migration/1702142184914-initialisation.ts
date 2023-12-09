import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialisation1702142184914 implements MigrationInterface {
    name = 'Initialisation1702142184914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "image" varchar NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "max_stock" integer NOT NULL, "syrup_type" varchar NOT NULL)')
        await queryRunner.query('CREATE TABLE "order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_id" integer, "product_id" integer)')
        await queryRunner.query('CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customer_name" varchar NOT NULL, "customer_email" varchar NOT NULL, "order_status" varchar NOT NULL DEFAULT (\'creating\'))')
        await queryRunner.query('CREATE TABLE "temporary_order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_id" integer, "product_id" integer, CONSTRAINT "FK_ed8fae6d7239e9d730219215af7" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id" FROM "order_line"')
        await queryRunner.query('DROP TABLE "order_line"')
        await queryRunner.query('ALTER TABLE "temporary_order_line" RENAME TO "order_line"')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "order_line" RENAME TO "temporary_order_line"')
        await queryRunner.query('CREATE TABLE "order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_id" integer, "product_id" integer)')
        await queryRunner.query('INSERT INTO "order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id" FROM "temporary_order_line"')
        await queryRunner.query('DROP TABLE "temporary_order_line"')
        await queryRunner.query('DROP TABLE "order"')
        await queryRunner.query('DROP TABLE "order_line"')
        await queryRunner.query('DROP TABLE "product"')
    }

}
