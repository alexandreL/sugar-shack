import { MigrationInterface, QueryRunner } from 'typeorm'

export class PriceModifier1702230963577 implements MigrationInterface {
    name = 'PriceModifier1702230963577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "temporary_order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_id" integer, "product_id" integer, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id" FROM "order_line"')
        await queryRunner.query('DROP TABLE "order_line"')
        await queryRunner.query('ALTER TABLE "temporary_order_line" RENAME TO "order_line"')
        await queryRunner.query('CREATE TABLE "temporary_order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_uuid" integer, "product_id" integer, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id" FROM "order_line"')
        await queryRunner.query('DROP TABLE "order_line"')
        await queryRunner.query('ALTER TABLE "temporary_order_line" RENAME TO "order_line"')
        await queryRunner.query('CREATE TABLE "temporary_order" ("customer_name" varchar NOT NULL, "customer_email" varchar NOT NULL, "order_status" varchar NOT NULL DEFAULT (\'creating\'))')
        await queryRunner.query('INSERT INTO "temporary_order"("customer_name", "customer_email", "order_status") SELECT "customer_name", "customer_email", "order_status" FROM "order"')
        await queryRunner.query('DROP TABLE "order"')
        await queryRunner.query('ALTER TABLE "temporary_order" RENAME TO "order"')
        await queryRunner.query('CREATE TABLE "temporary_order" ("customer_name" varchar NOT NULL, "customer_email" varchar NOT NULL, "order_status" varchar NOT NULL DEFAULT (\'creating\'), "uuid" varchar PRIMARY KEY NOT NULL, "total_price" integer NOT NULL)')
        await queryRunner.query('INSERT INTO "temporary_order"("customer_name", "customer_email", "order_status") SELECT "customer_name", "customer_email", "order_status" FROM "order"')
        await queryRunner.query('DROP TABLE "order"')
        await queryRunner.query('ALTER TABLE "temporary_order" RENAME TO "order"')
        await queryRunner.query('CREATE TABLE "temporary_order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_uuid" varchar, "product_id" integer, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id" FROM "order_line"')
        await queryRunner.query('DROP TABLE "order_line"')
        await queryRunner.query('ALTER TABLE "temporary_order_line" RENAME TO "order_line"')
        await queryRunner.query('CREATE TABLE "temporary_order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_uuid" varchar, "product_id" integer, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_f4d88b575009ead3dee34ca2a41" FOREIGN KEY ("order_uuid") REFERENCES "order" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id" FROM "order_line"')
        await queryRunner.query('DROP TABLE "order_line"')
        await queryRunner.query('ALTER TABLE "temporary_order_line" RENAME TO "order_line"')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "order_line" RENAME TO "temporary_order_line"')
        await queryRunner.query('CREATE TABLE "order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_uuid" varchar, "product_id" integer, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id" FROM "temporary_order_line"')
        await queryRunner.query('DROP TABLE "temporary_order_line"')
        await queryRunner.query('ALTER TABLE "order_line" RENAME TO "temporary_order_line"')
        await queryRunner.query('CREATE TABLE "order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_uuid" integer, "product_id" integer, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id" FROM "temporary_order_line"')
        await queryRunner.query('DROP TABLE "temporary_order_line"')
        await queryRunner.query('ALTER TABLE "order" RENAME TO "temporary_order"')
        await queryRunner.query('CREATE TABLE "order" ("customer_name" varchar NOT NULL, "customer_email" varchar NOT NULL, "order_status" varchar NOT NULL DEFAULT (\'creating\'))')
        await queryRunner.query('INSERT INTO "order"("customer_name", "customer_email", "order_status") SELECT "customer_name", "customer_email", "order_status" FROM "temporary_order"')
        await queryRunner.query('DROP TABLE "temporary_order"')
        await queryRunner.query('ALTER TABLE "order" RENAME TO "temporary_order"')
        await queryRunner.query('CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customer_name" varchar NOT NULL, "customer_email" varchar NOT NULL, "order_status" varchar NOT NULL DEFAULT (\'creating\'))')
        await queryRunner.query('INSERT INTO "order"("customer_name", "customer_email", "order_status") SELECT "customer_name", "customer_email", "order_status" FROM "temporary_order"')
        await queryRunner.query('DROP TABLE "temporary_order"')
        await queryRunner.query('ALTER TABLE "order_line" RENAME TO "temporary_order_line"')
        await queryRunner.query('CREATE TABLE "order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_id" integer, "product_id" integer, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_uuid", "product_id" FROM "temporary_order_line"')
        await queryRunner.query('DROP TABLE "temporary_order_line"')
        await queryRunner.query('ALTER TABLE "order_line" RENAME TO "temporary_order_line"')
        await queryRunner.query('CREATE TABLE "order_line" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product_name" varchar NOT NULL, "product_image" varchar NOT NULL, "product_price" integer NOT NULL, "quantity" integer NOT NULL, "syrup_type" varchar NOT NULL, "order_id" integer, "product_id" integer, CONSTRAINT "FK_4526de8c78faf508b2ef1e84366" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_ed8fae6d7239e9d730219215af7" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "order_line"("id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id") SELECT "id", "product_name", "product_image", "product_price", "quantity", "syrup_type", "order_id", "product_id" FROM "temporary_order_line"')
        await queryRunner.query('DROP TABLE "temporary_order_line"')
    }

}
