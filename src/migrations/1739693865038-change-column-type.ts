import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnType1739693865038 implements MigrationInterface {
    name = 'ChangeColumnType1739693865038';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`carts\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD \`total\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP COLUMN \`total_before_discount\``);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD \`total_before_discount\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`carts\` DROP COLUMN \`total_before_discount\``);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD \`total_before_discount\` varchar(255) NULL DEFAULT ''0''`);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD \`total\` varchar(255) NULL DEFAULT ''0''`);
    }
}
