import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationBetweenAttributesAndCategories1739322179599 implements MigrationInterface {
    name = 'CreateRelationBetweenAttributesAndCategories1739322179599';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`attribute_category\` (\`attributesId\` int NOT NULL, \`categoriesCateId\` int NOT NULL, INDEX \`IDX_034b14ce0ba7de19abadd6357f\` (\`attributesId\`), INDEX \`IDX_c630bd8f72a30a699993769ae1\` (\`categoriesCateId\`), PRIMARY KEY (\`attributesId\`, \`categoriesCateId\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`products_shipping_channels_shippings\` (\`products_id\` int NOT NULL, \`shippingsShippingChannelId\` int NOT NULL, INDEX \`IDX_e1b3eeb6b3b637946532dff784\` (\`products_id\`), INDEX \`IDX_07aff1acf3ac43e6f9c0edc709\` (\`shippingsShippingChannelId\`), PRIMARY KEY (\`products_id\`, \`shippingsShippingChannelId\`)) ENGINE=InnoDB`,
        );

        await queryRunner.query(
            `ALTER TABLE \`attribute_category\` ADD CONSTRAINT \`FK_034b14ce0ba7de19abadd6357f7\` FOREIGN KEY (\`attributesId\`) REFERENCES \`attributes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`attribute_category\` ADD CONSTRAINT \`FK_c630bd8f72a30a699993769ae1f\` FOREIGN KEY (\`categoriesCateId\`) REFERENCES \`categories\`(\`cate_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`products_shipping_channels_shippings\` ADD CONSTRAINT \`FK_e1b3eeb6b3b637946532dff7849\` FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`products_shipping_channels_shippings\` ADD CONSTRAINT \`FK_07aff1acf3ac43e6f9c0edc709d\` FOREIGN KEY (\`shippingsShippingChannelId\`) REFERENCES \`shippings\`(\`shipping_channel_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`products_shipping_channels_shippings\` DROP FOREIGN KEY \`FK_07aff1acf3ac43e6f9c0edc709d\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`products_shipping_channels_shippings\` DROP FOREIGN KEY \`FK_e1b3eeb6b3b637946532dff7849\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`attribute_category\` DROP FOREIGN KEY \`FK_c630bd8f72a30a699993769ae1f\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`attribute_category\` DROP FOREIGN KEY \`FK_034b14ce0ba7de19abadd6357f7\``,
        );

        await queryRunner.query(
            `DROP INDEX \`IDX_07aff1acf3ac43e6f9c0edc709\` ON \`products_shipping_channels_shippings\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_e1b3eeb6b3b637946532dff784\` ON \`products_shipping_channels_shippings\``,
        );
        await queryRunner.query(`DROP TABLE \`products_shipping_channels_shippings\``);
        await queryRunner.query(`DROP INDEX \`IDX_c630bd8f72a30a699993769ae1\` ON \`attribute_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_034b14ce0ba7de19abadd6357f\` ON \`attribute_category\``);
        await queryRunner.query(`DROP TABLE \`attribute_category\``);
    }
}
