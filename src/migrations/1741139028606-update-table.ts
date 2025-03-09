import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1741139028606 implements MigrationInterface {
    name = 'UpdateTable1741139028606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`price_before_discount\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`totalprice\` int NOT NULL`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`totalprice\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`price_before_discount\` int NOT NULL`);
    }

}
