import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDiscountColumnType1739463293919 implements MigrationInterface {
    name = 'ChangeDiscountColumnType1739463293919';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`discount\` float NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`discount\``);
    }
}
