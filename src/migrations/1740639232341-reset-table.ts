import { MigrationInterface, QueryRunner } from "typeorm";

export class ResetTable1740639232341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY IF EXISTS \`FK_bf25720b50f0a6da3235c292d9a\``);
        await queryRunner.query(`DELETE FROM \`shops\` WHERE 1`);
        await queryRunner.query(`DELETE FROM \`addresses\` WHERE 1`);
        await queryRunner.query(`DELETE FROM \`users\` WHERE 1`);
        await queryRunner.query(`DELETE FROM \`products\` WHERE 1`);
        await queryRunner.query(`DELETE FROM \`options\` WHERE 1`);
        await queryRunner.query(`ALTER TABLE \`products\` AUTO_INCREMENT = 1`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
