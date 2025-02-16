import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddressColumn1739718478198 implements MigrationInterface {
    name = 'UpdateAddressColumn1739718478198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_3e27a8fc336ce24a08833ae34f2\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_9d48998b97e7a97c4fddab1463b\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_3e27a8fc336ce24a08833ae34f2\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_9d48998b97e7a97c4fddab1463b\` FOREIGN KEY (\`shop\`) REFERENCES \`shops\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_9d48998b97e7a97c4fddab1463b\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_3e27a8fc336ce24a08833ae34f2\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_9d48998b97e7a97c4fddab1463b\` FOREIGN KEY (\`shop\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_3e27a8fc336ce24a08833ae34f2\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
