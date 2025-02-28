import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTable1739421746548 implements MigrationInterface {
    name = 'UpdateTable1739421746548';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` ADD \`fee\` int NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE \`shipping_product_infos\` ADD \`estimated_delivery_days_min\` int NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`shipping_product_infos\` ADD \`estimated_delivery_days_max\` int NOT NULL`,
        );
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` ADD \`freeship\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP COLUMN \`freeship\``);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP COLUMN \`estimated_delivery_days_max\``);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP COLUMN \`estimated_delivery_days_min\``);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP COLUMN \`fee\``);
    }
}
