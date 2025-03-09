import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBlockidColumnToCartItemTable1740975623346 implements MigrationInterface {
    name = 'AddBlockidColumnToCartItemTable1740975623346';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`block_id\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`block_id\``);
    }
}
