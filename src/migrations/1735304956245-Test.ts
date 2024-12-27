import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1735304956245 implements MigrationInterface {
    name = "Test1735304956245";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`_id\` varchar(36) NOT NULL, \`name\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`dob\` datetime NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email_verify_token\` varchar(255) NULL, \`forgot_password_token\` varchar(255) NULL, \`verify\` enum ('0', '1', '2') NOT NULL DEFAULT '0', \`avatar\` varchar(255) NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
