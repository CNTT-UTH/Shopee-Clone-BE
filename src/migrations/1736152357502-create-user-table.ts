import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1736152357502 implements MigrationInterface {
    name = 'CreateUserTable1736152357502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`_id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` text(65535) NOT NULL, \`name\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`dob\` datetime NULL, \`phone\` varchar(255) NULL, \`gender\` enum ('0', '1', '2') NOT NULL DEFAULT '2', \`isShop\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('0', '1') NOT NULL DEFAULT '0', \`refresh_token\` text(65535) NULL, \`refresh_token_mobile\` text(65535) NULL, \`verify\` enum ('0', '1', '2') NOT NULL DEFAULT '0', \`avatar\` text(65535) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
