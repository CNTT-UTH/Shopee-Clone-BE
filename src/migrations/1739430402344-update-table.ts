import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739430402344 implements MigrationInterface {
    name = 'UpdateTable1739430402344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` ADD CONSTRAINT \`FK_c2d6ad0410696a652e80eae18e1\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` ADD CONSTRAINT \`FK_bfa92764262768ce8f1559043cb\` FOREIGN KEY (\`shipping_channel_id\`) REFERENCES \`shippings\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP FOREIGN KEY \`FK_bfa92764262768ce8f1559043cb\``);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP FOREIGN KEY \`FK_c2d6ad0410696a652e80eae18e1\``);
    }

}
