import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderTable1741101697289 implements MigrationInterface {
    name = 'UpdateOrderTable1741101697289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY IF EXISTS \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY IF EXISTS \`FK_11836543386b9135a47d54cab70\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY IF EXISTS \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY IF EXISTS \`FK_9263386c35b6b242540f9493b00\``);
       
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY IF EXISTS \`FK_899f633317d513749082e4aadff\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY IF EXISTS \`FK_33f20db82908f7685a5c0c58ac6\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_899f633317d513749082e4aadff\` FOREIGN KEY (\`shipping_detail_id\`) REFERENCES \`shipping_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_33f20db82908f7685a5c0c58ac6\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`shipping_channel_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_11836543386b9135a47d54cab70\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
           }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY IF EXISTS \`FK_11836543386b9135a47d54cab70\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY IF EXISTS \`FK_9263386c35b6b242540f9493b00\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY IF EXISTS \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY IF EXISTS \`FK_33f20db82908f7685a5c0c58ac6\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY IF EXISTS \`FK_899f633317d513749082e4aadff\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY IF EXISTS \`FK_a922b820eeef29ac1c6800e826a\``);

        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_33f20db82908f7685a5c0c58ac6\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_899f633317d513749082e4aadff\` FOREIGN KEY (\`shipping_detail_id\`) REFERENCES \`shipping_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_11836543386b9135a47d54cab70\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
