import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOldPriceColumn1739452001223 implements MigrationInterface {
    name = 'CreateOldPriceColumn1739452001223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`old_price\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`old_price\``);
    }

}
