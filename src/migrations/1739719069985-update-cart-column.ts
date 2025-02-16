import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCartColumn1739719069985 implements MigrationInterface {
    name = 'UpdateCartColumn1739719069985';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_ad4336ea52ca96a9094a76cd9f3\``);
        await queryRunner.query(
            `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_ad4336ea52ca96a9094a76cd9f3\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_ad4336ea52ca96a9094a76cd9f3\``);
        await queryRunner.query(
            `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_ad4336ea52ca96a9094a76cd9f3\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
