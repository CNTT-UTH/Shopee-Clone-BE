import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderTable1741324616602 implements MigrationInterface {
    name = 'UpdateOrderTable1741324616602';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`status\``);
        await queryRunner.query(
            `ALTER TABLE \`orders\` ADD \`status\` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '1'`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(
            `ALTER TABLE \`order_items\` ADD \`status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT ''0''`,
        );
    }
}
