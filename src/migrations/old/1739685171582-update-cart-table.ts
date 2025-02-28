import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCartTable1739685171582 implements MigrationInterface {
    name = 'UpdateCartTable1739685171582';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`cart_id\` int NULL`);
        await queryRunner.query(
            `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_6385a745d9e12a89b859bb25623\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_6385a745d9e12a89b859bb25623\``);

        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`cart_id\``);
    }
}
