import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentOrder1741106822572 implements MigrationInterface {
    name = 'CreatePaymentOrder1741106822572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payment_methods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` double NOT NULL, \`status\` enum ('0', '1') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`payment_type_id\` int NULL, \`order_id\` varchar(36) NULL, UNIQUE INDEX \`REL_5fb61b9bf1058e6494751fb151\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`delivery_tracking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('0', '1', '2', '3') NOT NULL, \`timestamp\` date NOT NULL, \`message\` text NOT NULL, \`order_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`payment_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD UNIQUE INDEX \`IDX_5b3e94bd2aedc184f9ad8c1043\` (\`payment_id\`)`);
        await queryRunner.query(`ALTER TABLE \`payment_details\` ADD CONSTRAINT \`FK_4084f17a74e1b481add0c55f389\` FOREIGN KEY (\`payment_type_id\`) REFERENCES \`payment_methods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_details\` ADD CONSTRAINT \`FK_5fb61b9bf1058e6494751fb1511\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_5b3e94bd2aedc184f9ad8c10439\` FOREIGN KEY (\`payment_id\`) REFERENCES \`payment_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`delivery_tracking\` ADD CONSTRAINT \`FK_9baaa588693ae1f7335b63fa4ac\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
       }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE \`delivery_tracking\` DROP FOREIGN KEY \`FK_9baaa588693ae1f7335b63fa4ac\``);
        
        
        await queryRunner.query(`ALTER TABLE \`payment_details\` DROP FOREIGN KEY \`FK_5fb61b9bf1058e6494751fb1511\``);
        await queryRunner.query(`ALTER TABLE \`payment_details\` DROP FOREIGN KEY \`FK_4084f17a74e1b481add0c55f389\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_5b3e94bd2aedc184f9ad8c10439\``);

        // await queryRunner.query(`DROP INDEX \`IDX_5b3e94bd2aedc184f9ad8c1043\` ON \`orders\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`payment_id\``);
        await queryRunner.query(`DROP TABLE \`delivery_tracking\``);
        await queryRunner.query(`DROP INDEX \`REL_5fb61b9bf1058e6494751fb151\` ON \`payment_details\``);
        await queryRunner.query(`DROP TABLE \`payment_details\``);
        await queryRunner.query(`DROP TABLE \`payment_methods\``);
    }

}
