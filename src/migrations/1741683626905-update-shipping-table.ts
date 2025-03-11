import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateShippingTable1741683626905 implements MigrationInterface {
    name = 'UpdateShippingTable1741683626905';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY  \`FK_bf120744766b0d4fd8e6a35005b\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP COLUMN  \`address_id\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` ADD \`address_id\` int NULL`);

        await queryRunner.query(
            `ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_bf120744766b0d4fd8e6a35005b\` FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
