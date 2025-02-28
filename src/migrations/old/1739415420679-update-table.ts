import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTable1739415420679 implements MigrationInterface {
    name = 'UpdateTable1739415420679';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`shipping_product_infos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_id\` int NULL, \`shipping_channel_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`old_price\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`range_min_price\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`range_max_price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`weight\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`width\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`height\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`length\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`length\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`height\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`width\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`weight\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`range_max_price\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`range_min_price\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`old_price\` int NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE \`shipping_product_infos\``);
    }
}
