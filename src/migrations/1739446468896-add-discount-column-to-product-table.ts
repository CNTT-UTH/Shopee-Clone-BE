import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDiscountColumnToProductTable1739446468896 implements MigrationInterface {
    name = 'AddDiscountColumnToProductTable1739446468896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`discount\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`discount\``);
    }

}
