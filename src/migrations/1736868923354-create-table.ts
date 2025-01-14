import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1736868923354 implements MigrationInterface {
    name = 'CreateTable1736868923354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`city\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`ward\` varchar(255) NOT NULL, \`address_line\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`_id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` text(65535) NOT NULL, \`name\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`dob\` datetime NULL, \`phone\` varchar(255) NULL, \`gender\` enum ('0', '1', '2') NOT NULL DEFAULT '2', \`isShop\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('0', '1') NOT NULL DEFAULT '0', \`refresh_token\` text(65535) NULL, \`refresh_token_mobile\` text(65535) NULL, \`verify\` enum ('0', '1', '2') NOT NULL DEFAULT '0', \`avatar\` text(65535) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`cate_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`parent_cate_id\` int NULL, \`level\` int NOT NULL, \`image_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`cate_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brands\` (\`_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`image_url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NULL, PRIMARY KEY (\`image_url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`option_values\` (\`value_id\` int NOT NULL AUTO_INCREMENT, \`value_name\` varchar(255) NOT NULL, \`image_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`option_id\` int NULL, PRIMARY KEY (\`value_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_variants\` (\`variant_id\` int NOT NULL AUTO_INCREMENT, \`sku\` varchar(255) NOT NULL, \`quantity\` int NULL DEFAULT '0', \`buyturn\` int NULL DEFAULT '0', \`name\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`old_price\` varchar(255) NOT NULL, \`image_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NULL, PRIMARY KEY (\`variant_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attributes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attribute_values\` (\`id\` int NOT NULL, \`product_id\` int NOT NULL, \`value\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`attribute_id\` int NULL, UNIQUE INDEX \`REL_be02d0f6a15bc7a0d835f832b6\` (\`attribute_id\`), PRIMARY KEY (\`id\`, \`product_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`_id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text(65535) NULL, \`specification\` text(65535) NULL, \`category_id\` int NOT NULL, \`quantity\` int NULL DEFAULT '0', \`old_price\` int NULL DEFAULT '0', \`price\` int NULL DEFAULT '0', \`range_min_price\` int NULL DEFAULT '0', \`range_max_price\` int NULL DEFAULT '0', \`buyturn\` int NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`brand_id\` int NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`variant_option_values\` (\`variant_id\` int NOT NULL, \`value_id\` int NOT NULL, INDEX \`IDX_3d396f66a33e2328f439515abd\` (\`variant_id\`), INDEX \`IDX_9451561b94b0f1ca37d8713b90\` (\`value_id\`), PRIMARY KEY (\`variant_id\`, \`value_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_categories_categories\` (\`products_id\` int NOT NULL, \`categoriesCateId\` int NOT NULL, INDEX \`IDX_33b3d063e19cbc57557320586c\` (\`products_id\`), INDEX \`IDX_ec35e9518dea024ab346617c10\` (\`categoriesCateId\`), PRIMARY KEY (\`products_id\`, \`categoriesCateId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_3e27a8fc336ce24a08833ae34f2\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_96fabbb1202770b8e6a58bf6f1d\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`options\` ADD CONSTRAINT \`FK_8f509b13eba74e88f50da0d1133\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`option_values\` ADD CONSTRAINT \`FK_866eecd9bde39fd5bc4b8d86369\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_6343513e20e2deab45edfce1316\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_be02d0f6a15bc7a0d835f832b62\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_84d26b8d3aca1b113b0a423b83c\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`variant_option_values\` ADD CONSTRAINT \`FK_3d396f66a33e2328f439515abdf\` FOREIGN KEY (\`variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`variant_option_values\` ADD CONSTRAINT \`FK_9451561b94b0f1ca37d8713b901\` FOREIGN KEY (\`value_id\`) REFERENCES \`option_values\`(\`value_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_categories_categories\` ADD CONSTRAINT \`FK_33b3d063e19cbc57557320586ca\` FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`products_categories_categories\` ADD CONSTRAINT \`FK_ec35e9518dea024ab346617c108\` FOREIGN KEY (\`categoriesCateId\`) REFERENCES \`categories\`(\`cate_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_categories_categories\` DROP FOREIGN KEY \`FK_ec35e9518dea024ab346617c108\``);
        await queryRunner.query(`ALTER TABLE \`products_categories_categories\` DROP FOREIGN KEY \`FK_33b3d063e19cbc57557320586ca\``);
        await queryRunner.query(`ALTER TABLE \`variant_option_values\` DROP FOREIGN KEY \`FK_9451561b94b0f1ca37d8713b901\``);
        await queryRunner.query(`ALTER TABLE \`variant_option_values\` DROP FOREIGN KEY \`FK_3d396f66a33e2328f439515abdf\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_84d26b8d3aca1b113b0a423b83c\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_be02d0f6a15bc7a0d835f832b62\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_6343513e20e2deab45edfce1316\``);
        await queryRunner.query(`ALTER TABLE \`option_values\` DROP FOREIGN KEY \`FK_866eecd9bde39fd5bc4b8d86369\``);
        await queryRunner.query(`ALTER TABLE \`options\` DROP FOREIGN KEY \`FK_8f509b13eba74e88f50da0d1133\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_96fabbb1202770b8e6a58bf6f1d\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_3e27a8fc336ce24a08833ae34f2\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec35e9518dea024ab346617c10\` ON \`products_categories_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_33b3d063e19cbc57557320586c\` ON \`products_categories_categories\``);
        await queryRunner.query(`DROP TABLE \`products_categories_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_9451561b94b0f1ca37d8713b90\` ON \`variant_option_values\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d396f66a33e2328f439515abd\` ON \`variant_option_values\``);
        await queryRunner.query(`DROP TABLE \`variant_option_values\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`REL_be02d0f6a15bc7a0d835f832b6\` ON \`attribute_values\``);
        await queryRunner.query(`DROP TABLE \`attribute_values\``);
        await queryRunner.query(`DROP TABLE \`attributes\``);
        await queryRunner.query(`DROP TABLE \`product_variants\``);
        await queryRunner.query(`DROP TABLE \`option_values\``);
        await queryRunner.query(`DROP TABLE \`options\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP TABLE \`brands\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
    }

}
