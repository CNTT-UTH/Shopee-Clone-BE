import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShopLocationField1740299027477 implements MigrationInterface {
    name = 'CreateShopLocationField1740299027477';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shops\` ADD \`shop_location\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shops\` DROP COLUMN \`shop_location\``);
    }
}
