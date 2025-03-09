import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageColumnProduct1741237335710 implements MigrationInterface {
    name = 'AddImageColumnProduct1741237335710';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`image\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`image\``);
    }
}
