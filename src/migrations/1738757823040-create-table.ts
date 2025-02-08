import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1738757823040 implements MigrationInterface {
    name = 'CreateTable1738757823040';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`categories\` (\`cate_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`parent_cate_id\` int NULL, \`level\` int NOT NULL, \`image_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`cate_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`brands\` (\`_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`images\` (\`image_url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NULL, PRIMARY KEY (\`image_url\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`attributes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`attribute_values\` (\`id\` int NOT NULL, \`product_id\` int NOT NULL, \`value\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`attribute_id\` int NULL, UNIQUE INDEX \`REL_be02d0f6a15bc7a0d835f832b6\` (\`attribute_id\`), PRIMARY KEY (\`id\`, \`product_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`shippings\` (\`shipping_channel_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`desc\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`shipping_channel_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`shipping_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fee\` int NOT NULL DEFAULT '0', \`note_for_shipper\` text NOT NULL, \`estimated_delivery_date_from\` datetime NOT NULL, \`estimated_delivery_date_to\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shipping_channel_id\` int NULL, \`order_id\` varchar(36) NULL, \`address_id\` int NULL, UNIQUE INDEX \`REL_a9fe3ec588dbd5110ab7550406\` (\`order_id\`), UNIQUE INDEX \`REL_bf120744766b0d4fd8e6a35005\` (\`address_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`orders\` (\`shipping_channel_id\` varchar(36) NOT NULL, \`total\` int NOT NULL DEFAULT '0', \`price_before_discount\` int NOT NULL DEFAULT '0', \`desc\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`shipping_detail_id\` int NULL, \`shop_id\` int NULL, UNIQUE INDEX \`REL_899f633317d513749082e4aadf\` (\`shipping_detail_id\`), PRIMARY KEY (\`shipping_channel_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`order_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`price_before_discount\` int NOT NULL, \`quantity\` int NOT NULL DEFAULT '1', \`status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`order_id\` varchar(36) NULL, \`product_id\` int NULL, \`product_variant_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`shops\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NULL, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`status\` enum ('0', '1', '2') NOT NULL DEFAULT '0', \`avatar\` text NULL, \`last_time_active\` datetime NULL, \`default_address_id\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, UNIQUE INDEX \`REL_bb9c758dcc60137e56f6fee72f\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`city\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`ward\` varchar(255) NOT NULL, \`address_line\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user\` varchar(36) NULL, \`shop\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`_id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`name\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`dob\` datetime NULL, \`phone\` varchar(255) NULL, \`gender\` enum ('0', '1', '2') NOT NULL DEFAULT '2', \`is_shop\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('0', '1') NOT NULL DEFAULT '0', \`refresh_token\` text NULL, \`refresh_token_mobile\` text NULL, \`verify\` enum ('0', '1', '2') NOT NULL DEFAULT '0', \`avatar\` text NULL, \`default_address_id\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cart_id\` int NULL, UNIQUE INDEX \`REL_cbfb19ddc0218b26522f9fea2e\` (\`cart_id\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`total\` varchar(255) NULL DEFAULT '0', \`total_before_discount\` varchar(255) NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, UNIQUE INDEX \`REL_2ec1c94a977b940d85a4f498ae\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`cart_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL DEFAULT '1', \`selected_to_checkout\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NULL, \`product_variant_id\` int NULL, \`shop_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`products\` (\`_id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`sku\` varchar(255) NOT NULL, \`description\` text NULL, \`specification\` text NULL, \`category_id\` int NOT NULL, \`quantity\` int NULL DEFAULT '0', \`old_price\` int NULL DEFAULT '0', \`price\` int NULL DEFAULT '0', \`range_min_price\` int NULL DEFAULT '0', \`range_max_price\` int NULL DEFAULT '0', \`buyturn\` int NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`brand_id\` int NULL, \`shop_id\` int NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`option_values\` (\`value_id\` int NOT NULL AUTO_INCREMENT, \`value_name\` varchar(255) NOT NULL, \`image_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`option_id\` int NULL, PRIMARY KEY (\`value_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`product_variants\` (\`variant_id\` int NOT NULL AUTO_INCREMENT, \`sku\` varchar(255) NOT NULL, \`quantity\` int NULL DEFAULT '0', \`buyturn\` int NULL DEFAULT '0', \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`old_price\` int NOT NULL, \`image_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NULL, PRIMARY KEY (\`variant_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`products_categories_categories\` (\`products_id\` int NOT NULL, \`categoriesCateId\` int NOT NULL, INDEX \`IDX_33b3d063e19cbc57557320586c\` (\`products_id\`), INDEX \`IDX_ec35e9518dea024ab346617c10\` (\`categoriesCateId\`), PRIMARY KEY (\`products_id\`, \`categoriesCateId\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`variant_option_values\` (\`variant_id\` int NOT NULL, \`value_id\` int NOT NULL, INDEX \`IDX_3d396f66a33e2328f439515abd\` (\`variant_id\`), INDEX \`IDX_9451561b94b0f1ca37d8713b90\` (\`value_id\`), PRIMARY KEY (\`variant_id\`, \`value_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_96fabbb1202770b8e6a58bf6f1d\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_be02d0f6a15bc7a0d835f832b62\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_84d26b8d3aca1b113b0a423b83c\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_565cbf97ee9de5d1f046e01ea8b\` FOREIGN KEY (\`shipping_channel_id\`) REFERENCES \`shippings\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_a9fe3ec588dbd5110ab7550406e\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_bf120744766b0d4fd8e6a35005b\` FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_899f633317d513749082e4aadff\` FOREIGN KEY (\`shipping_detail_id\`) REFERENCES \`shipping_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_33f20db82908f7685a5c0c58ac6\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_11836543386b9135a47d54cab70\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bb9c758dcc60137e56f6fee72f7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_3e27a8fc336ce24a08833ae34f2\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_9d48998b97e7a97c4fddab1463b\` FOREIGN KEY (\`shop\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_cbfb19ddc0218b26522f9fea2eb\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_2ec1c94a977b940d85a4f498aea\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_30e89257a105eab7648a35c7fce\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_de29bab7b2bb3b49c07253275f1\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_ad4336ea52ca96a9094a76cd9f3\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9e952e93f369f16e27dd786c33f\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` ADD CONSTRAINT \`FK_8f509b13eba74e88f50da0d1133\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`option_values\` ADD CONSTRAINT \`FK_866eecd9bde39fd5bc4b8d86369\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_6343513e20e2deab45edfce1316\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`products_categories_categories\` ADD CONSTRAINT \`FK_33b3d063e19cbc57557320586ca\` FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`products_categories_categories\` ADD CONSTRAINT \`FK_ec35e9518dea024ab346617c108\` FOREIGN KEY (\`categoriesCateId\`) REFERENCES \`categories\`(\`cate_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`variant_option_values\` ADD CONSTRAINT \`FK_3d396f66a33e2328f439515abdf\` FOREIGN KEY (\`variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`variant_option_values\` ADD CONSTRAINT \`FK_9451561b94b0f1ca37d8713b901\` FOREIGN KEY (\`value_id\`) REFERENCES \`option_values\`(\`value_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`variant_option_values\` DROP FOREIGN KEY \`FK_9451561b94b0f1ca37d8713b901\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`variant_option_values\` DROP FOREIGN KEY \`FK_3d396f66a33e2328f439515abdf\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`products_categories_categories\` DROP FOREIGN KEY \`FK_ec35e9518dea024ab346617c108\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`products_categories_categories\` DROP FOREIGN KEY \`FK_33b3d063e19cbc57557320586ca\``,
        );
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_6343513e20e2deab45edfce1316\``);
        await queryRunner.query(`ALTER TABLE \`option_values\` DROP FOREIGN KEY \`FK_866eecd9bde39fd5bc4b8d86369\``);
        await queryRunner.query(`ALTER TABLE \`options\` DROP FOREIGN KEY \`FK_8f509b13eba74e88f50da0d1133\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9e952e93f369f16e27dd786c33f\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_ad4336ea52ca96a9094a76cd9f3\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_de29bab7b2bb3b49c07253275f1\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_30e89257a105eab7648a35c7fce\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_2ec1c94a977b940d85a4f498aea\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_cbfb19ddc0218b26522f9fea2eb\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_9d48998b97e7a97c4fddab1463b\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_3e27a8fc336ce24a08833ae34f2\``);
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bb9c758dcc60137e56f6fee72f7\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_11836543386b9135a47d54cab70\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_9263386c35b6b242540f9493b00\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_33f20db82908f7685a5c0c58ac6\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_899f633317d513749082e4aadff\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_bf120744766b0d4fd8e6a35005b\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_a9fe3ec588dbd5110ab7550406e\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_565cbf97ee9de5d1f046e01ea8b\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_84d26b8d3aca1b113b0a423b83c\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_be02d0f6a15bc7a0d835f832b62\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_96fabbb1202770b8e6a58bf6f1d\``);
        await queryRunner.query(`DROP INDEX \`IDX_9451561b94b0f1ca37d8713b90\` ON \`variant_option_values\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d396f66a33e2328f439515abd\` ON \`variant_option_values\``);
        await queryRunner.query(`DROP TABLE \`variant_option_values\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec35e9518dea024ab346617c10\` ON \`products_categories_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_33b3d063e19cbc57557320586c\` ON \`products_categories_categories\``);
        await queryRunner.query(`DROP TABLE \`products_categories_categories\``);
        await queryRunner.query(`DROP TABLE \`product_variants\``);
        await queryRunner.query(`DROP TABLE \`option_values\``);
        await queryRunner.query(`DROP TABLE \`options\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`cart_items\``);
        await queryRunner.query(`DROP INDEX \`REL_2ec1c94a977b940d85a4f498ae\` ON \`carts\``);
        await queryRunner.query(`DROP TABLE \`carts\``);
        await queryRunner.query(`DROP INDEX \`REL_cbfb19ddc0218b26522f9fea2e\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
        await queryRunner.query(`DROP INDEX \`REL_bb9c758dcc60137e56f6fee72f\` ON \`shops\``);
        await queryRunner.query(`DROP TABLE \`shops\``);
        await queryRunner.query(`DROP TABLE \`order_items\``);
        await queryRunner.query(`DROP INDEX \`REL_899f633317d513749082e4aadf\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP INDEX \`REL_bf120744766b0d4fd8e6a35005\` ON \`shipping_details\``);
        await queryRunner.query(`DROP INDEX \`REL_a9fe3ec588dbd5110ab7550406\` ON \`shipping_details\``);
        await queryRunner.query(`DROP TABLE \`shipping_details\``);
        await queryRunner.query(`DROP TABLE \`shippings\``);
        await queryRunner.query(`DROP INDEX \`REL_be02d0f6a15bc7a0d835f832b6\` ON \`attribute_values\``);
        await queryRunner.query(`DROP TABLE \`attribute_values\``);
        await queryRunner.query(`DROP TABLE \`attributes\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP TABLE \`brands\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }
}
