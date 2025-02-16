import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnsProduct1739707153222 implements MigrationInterface {
    name = 'UpdateColumnsProduct1739707153222';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price_range_min\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price_range_max\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price_range_min_old\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price_range_max_old\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price_range_max_old\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price_range_min_old\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price_range_max\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price_range_min\``);
    }
}
