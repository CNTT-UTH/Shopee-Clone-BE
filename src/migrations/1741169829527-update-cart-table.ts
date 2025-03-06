import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCartTable1741169829527 implements MigrationInterface {
    name = 'UpdateCartTable1741169829527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`price_before_discount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`total_price\` int NOT NULL`);
       }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`total_price\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`price_before_discount\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`price\``);
      }

}
