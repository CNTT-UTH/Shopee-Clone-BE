import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderColumn1741601956424 implements MigrationInterface {
    name = 'UpdateOrderColumn1741601956424';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`price_before_discount\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`total_product\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`total_product\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`price_before_discount\` int NOT NULL DEFAULT '0'`);
    }
}
