import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739417267806 implements MigrationInterface {
    name = 'UpdateTable1739417267806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_84d26b8d3aca1b113b0a423b83c\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_be02d0f6a15bc7a0d835f832b62\``);
        await queryRunner.query(`DROP INDEX \`REL_be02d0f6a15bc7a0d835f832b6\` ON \`attribute_values\``);
        await queryRunner.query(`DROP TABLE \`attribute_values\``);

        await queryRunner.query(`CREATE TABLE \`attribute_values\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`attribute_id\` int NULL, \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_be02d0f6a15bc7a0d835f832b62\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_84d26b8d3aca1b113b0a423b83c\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_84d26b8d3aca1b113b0a423b83c\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_be02d0f6a15bc7a0d835f832b62\``);
        
        await queryRunner.query(`DROP TABLE \`attribute_values\``);
    }

}
