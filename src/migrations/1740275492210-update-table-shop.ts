import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableShop1740275492210 implements MigrationInterface {
    name = 'UpdateTableShop1740275492210';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`user_id\` ON \`shops\``);
        await queryRunner.query(`DROP INDEX \`FK_9d48998b97e7a97c4fddab1463b\` ON \`addresses\``);

        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bf25720b50f0a6da3235c292d9a\``);
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bb9c758dcc60137e56f6fee72f7\``);
        await queryRunner.query(
            `ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bb9c758dcc60137e56f6fee72f7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bf25720b50f0a6da3235c292d9a\` FOREIGN KEY (\`default_address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_9d48998b97e7a97c4fddab1463b\` FOREIGN KEY (\`shop\`) REFERENCES \`shops\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bf25720b50f0a6da3235c292d9a\``);
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bb9c758dcc60137e56f6fee72f7\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_9d48998b97e7a97c4fddab1463b\``);
        await queryRunner.query(
            `ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bf25720b50f0a6da3235c292d9a\` FOREIGN KEY (\`default_address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`CREATE INDEX \`FK_9d48998b97e7a97c4fddab1463b\` ON \`addresses\` (\`shop\`)`);
        await queryRunner.query(`CREATE INDEX \`user_id\` ON \`shops\` (\`user_id\`)`);
    }
}
