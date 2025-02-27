import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationship1740624013883 implements MigrationInterface {
    name = 'UpdateRelationship1740624013883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`options\` DROP FOREIGN KEY \`FK_8f509b13eba74e88f50da0d1133\``);
        await queryRunner.query(`CREATE TABLE \`product_options\` (\`product_id\` int NOT NULL, \`option_id\` int NOT NULL, INDEX \`IDX_49677f87ad61a8b2a31f33c8a2\` (\`product_id\`), INDEX \`IDX_8d17fb61344ff9acf7b706ae02\` (\`option_id\`), PRIMARY KEY (\`product_id\`, \`option_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`options\` DROP COLUMN \`product_id\``);



        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_96fabbb1202770b8e6a58bf6f1d\``);


        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP FOREIGN KEY \`FK_c2d6ad0410696a652e80eae18e1\``);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP FOREIGN KEY \`FK_bfa92764262768ce8f1559043cb\``);


        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_565cbf97ee9de5d1f046e01ea8b\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_a9fe3ec588dbd5110ab7550406e\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_bf120744766b0d4fd8e6a35005b\``);



        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_899f633317d513749082e4aadff\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_33f20db82908f7685a5c0c58ac6\``);




        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_9263386c35b6b242540f9493b00\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_11836543386b9135a47d54cab70\``);



        await queryRunner.query(`ALTER TABLE \`option_values\` DROP FOREIGN KEY \`FK_866eecd9bde39fd5bc4b8d86369\``);


        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_6343513e20e2deab45edfce1316\``);



        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_be02d0f6a15bc7a0d835f832b62\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_84d26b8d3aca1b113b0a423b83c\``);


        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9e952e93f369f16e27dd786c33f\``);







        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_2ec1c94a977b940d85a4f498aea\``);

        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_6385a745d9e12a89b859bb25623\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_30e89257a105eab7648a35c7fce\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_de29bab7b2bb3b49c07253275f1\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_ad4336ea52ca96a9094a76cd9f3\``);




        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bf25720b50f0a6da3235c292d9a\``);
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bb9c758dcc60137e56f6fee72f7\``);






        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_3e27a8fc336ce24a08833ae34f2\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_9d48998b97e7a97c4fddab1463b\``);


        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_cbfb19ddc0218b26522f9fea2eb\``);








        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_96fabbb1202770b8e6a58bf6f1d\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` ADD CONSTRAINT \`FK_c2d6ad0410696a652e80eae18e1\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` ADD CONSTRAINT \`FK_bfa92764262768ce8f1559043cb\` FOREIGN KEY (\`shipping_channel_id\`) REFERENCES \`shippings\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_565cbf97ee9de5d1f046e01ea8b\` FOREIGN KEY (\`shipping_channel_id\`) REFERENCES \`shippings\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_a9fe3ec588dbd5110ab7550406e\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_bf120744766b0d4fd8e6a35005b\` FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_899f633317d513749082e4aadff\` FOREIGN KEY (\`shipping_detail_id\`) REFERENCES \`shipping_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_33f20db82908f7685a5c0c58ac6\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_11836543386b9135a47d54cab70\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`option_values\` ADD CONSTRAINT \`FK_866eecd9bde39fd5bc4b8d86369\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_6343513e20e2deab45edfce1316\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_be02d0f6a15bc7a0d835f832b62\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_84d26b8d3aca1b113b0a423b83c\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9e952e93f369f16e27dd786c33f\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_2ec1c94a977b940d85a4f498aea\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_6385a745d9e12a89b859bb25623\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_30e89257a105eab7648a35c7fce\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_de29bab7b2bb3b49c07253275f1\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_ad4336ea52ca96a9094a76cd9f3\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bb9c758dcc60137e56f6fee72f7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bf25720b50f0a6da3235c292d9a\` FOREIGN KEY (\`default_address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_3e27a8fc336ce24a08833ae34f2\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_9d48998b97e7a97c4fddab1463b\` FOREIGN KEY (\`shop\`) REFERENCES \`shops\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_cbfb19ddc0218b26522f9fea2eb\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_options\` ADD CONSTRAINT \`FK_49677f87ad61a8b2a31f33c8a2c\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_options\` ADD CONSTRAINT \`FK_8d17fb61344ff9acf7b706ae022\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_options\` DROP FOREIGN KEY \`FK_8d17fb61344ff9acf7b706ae022\``);
        await queryRunner.query(`ALTER TABLE \`product_options\` DROP FOREIGN KEY \`FK_49677f87ad61a8b2a31f33c8a2c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_cbfb19ddc0218b26522f9fea2eb\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_9d48998b97e7a97c4fddab1463b\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_3e27a8fc336ce24a08833ae34f2\``);
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bf25720b50f0a6da3235c292d9a\``);
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bb9c758dcc60137e56f6fee72f7\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_ad4336ea52ca96a9094a76cd9f3\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_de29bab7b2bb3b49c07253275f1\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_30e89257a105eab7648a35c7fce\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_6385a745d9e12a89b859bb25623\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_2ec1c94a977b940d85a4f498aea\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9e952e93f369f16e27dd786c33f\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_84d26b8d3aca1b113b0a423b83c\``);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_be02d0f6a15bc7a0d835f832b62\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_6343513e20e2deab45edfce1316\``);
        await queryRunner.query(`ALTER TABLE \`option_values\` DROP FOREIGN KEY \`FK_866eecd9bde39fd5bc4b8d86369\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_11836543386b9135a47d54cab70\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_9263386c35b6b242540f9493b00\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_33f20db82908f7685a5c0c58ac6\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_899f633317d513749082e4aadff\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_bf120744766b0d4fd8e6a35005b\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_a9fe3ec588dbd5110ab7550406e\``);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` DROP FOREIGN KEY \`FK_565cbf97ee9de5d1f046e01ea8b\``);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP FOREIGN KEY \`FK_bfa92764262768ce8f1559043cb\``);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` DROP FOREIGN KEY \`FK_c2d6ad0410696a652e80eae18e1\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_96fabbb1202770b8e6a58bf6f1d\``);








        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_cbfb19ddc0218b26522f9fea2eb\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);


        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_9d48998b97e7a97c4fddab1463b\` FOREIGN KEY (\`shop\`) REFERENCES \`shops\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_3e27a8fc336ce24a08833ae34f2\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);






        await queryRunner.query(`ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bb9c758dcc60137e56f6fee72f7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bf25720b50f0a6da3235c292d9a\` FOREIGN KEY (\`default_address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);




        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_ad4336ea52ca96a9094a76cd9f3\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_de29bab7b2bb3b49c07253275f1\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_30e89257a105eab7648a35c7fce\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_6385a745d9e12a89b859bb25623\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_2ec1c94a977b940d85a4f498aea\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);







        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9e952e93f369f16e27dd786c33f\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);


        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_84d26b8d3aca1b113b0a423b83c\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_be02d0f6a15bc7a0d835f832b62\` FOREIGN KEY (\`attribute_id\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);



        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_6343513e20e2deab45edfce1316\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);


        await queryRunner.query(`ALTER TABLE \`option_values\` ADD CONSTRAINT \`FK_866eecd9bde39fd5bc4b8d86369\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);



        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_11836543386b9135a47d54cab70\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`variant_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);




        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_33f20db82908f7685a5c0c58ac6\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_899f633317d513749082e4aadff\` FOREIGN KEY (\`shipping_detail_id\`) REFERENCES \`shipping_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);



        await queryRunner.query(`ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_bf120744766b0d4fd8e6a35005b\` FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_a9fe3ec588dbd5110ab7550406e\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_details\` ADD CONSTRAINT \`FK_565cbf97ee9de5d1f046e01ea8b\` FOREIGN KEY (\`shipping_channel_id\`) REFERENCES \`shippings\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);


        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` ADD CONSTRAINT \`FK_bfa92764262768ce8f1559043cb\` FOREIGN KEY (\`shipping_channel_id\`) REFERENCES \`shippings\`(\`shipping_channel_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shipping_product_infos\` ADD CONSTRAINT \`FK_c2d6ad0410696a652e80eae18e1\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);


        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_96fabbb1202770b8e6a58bf6f1d\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);



        await queryRunner.query(`ALTER TABLE \`options\` ADD \`product_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_8d17fb61344ff9acf7b706ae02\` ON \`product_options\``);
        await queryRunner.query(`DROP INDEX \`IDX_49677f87ad61a8b2a31f33c8a2\` ON \`product_options\``);
        await queryRunner.query(`DROP TABLE \`product_options\``);
        await queryRunner.query(`ALTER TABLE \`options\` ADD CONSTRAINT \`FK_8f509b13eba74e88f50da0d1133\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
