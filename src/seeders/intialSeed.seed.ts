import path, { dirname } from 'path';
import fs from 'fs';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '~/models/entity/user.entity';
import { Shop as ShopDTO, Product as ProductDTO } from './data/model';
import { Shop } from '~/models/entity/shop.entity';
import { Product } from '~/models/entity/product.entity';
import { faker, fakerEN_CA } from '@faker-js/faker';
import { Image } from '~/models/entity/image.entity';
import { Option, OptionValue, ProductVariant } from '~/models/entity/variant.entity';
import { ShippingInfoDTO } from '~/models/dtos/ShippingDTO';
import { ShippingRatesManagementService, ShippingService } from '~/services/shipping.service';
import { ShippingRepository } from '~/repository/shipping.repository';
import { Shipping, ShippingProductInfo } from '~/models/entity/shipping.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import AppDataSource from '~/dbs/db';

// const shippingRatesManagementService = new ShippingRatesManagementService();
// const shippingService = new ShippingService();
// const shippingRepo = new ShippingRepository();

const RAW_PRODUCT_JSON_DATA = path.join(__dirname, 'data', 'PRODUCT_DATA.JSON');
const RAW_SHOP_JSON_DATA = path.join(__dirname, 'data', 'SHOP_DATA.JSON');

const readData = async (path: string) => {
    const data = fs.readFileSync(path, 'utf-8');

    return JSON.parse(data);
};

export default class InitialDatabaseSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const queryRunner = AppDataSource.manager.queryRunner;

        if (queryRunner) {
            await queryRunner.query(`DELETE FROM \`products\` WHERE 1`);
            await queryRunner.query(`DELETE FROM \`options\` WHERE 1`);
            await queryRunner.query(`ALTER TABLE \`products\` AUTO_INCREMENT = 1`);
        }

        // return;
        const users = await factory(User)().createMany(500);
        let user_index: number = 0;

        const shopList: ShopDTO[] = await readData(RAW_SHOP_JSON_DATA);
        const productList: ProductDTO[] = await readData(RAW_PRODUCT_JSON_DATA);
        const shopMapping: { [index: number]: Shop } = {};

        for (const shop of shopList) {
            const newShop = await factory(Shop)().create({
                name: shop.shop_name,
                id: shop.shopid,
                shop_location: shop.shop_location,
                avatar: shop.avatar,
                user: users[user_index],
            });
            shopMapping[newShop.id] = newShop;

            user_index++;
        }

        console.log(shopMapping);
        // if (!shopMapping) return;

        let id_product: number = 1;

        for (const product of productList) {
            try {
                const newProduct = await connection.getRepository(Product).save({
                    _id: product.itemid,
                    title: product.name,
                    // title: Buffer.from(product.name ?? '', 'utf-8').toString('utf-8'),
                    // title: encodeURI(product.name ?? ''),
                    shop: shopMapping[product.shopid ?? 0],
                    sku: faker.string.alpha({ length: 10, casing: 'upper' }),
                    category_id: Number(product.catid),
                    quantity: product.stock,
                    buyturn: product.buyturn,
                    price: product.price,
                    old_price: product.price_before_discount,
                    price_range_min: product.price_min,
                    price_range_max: product.price_max,
                    price_range_min_old: product.price_min_before_discount,
                    price_range_max_old: product.price_max_before_discount,
                    discount: (product.raw_discount ?? 0) / 100,
                    image: product?.images?.[0] ?? '',
                    // images: images,
                    // options: options,
                    // variants: variants,
                    weight: product.weight,
                    created_at: new Date(product.ctime ?? 0),
                });
                // const newProduct = await factory(Product)().create({
                //     // _id: id_product,
                //     title: product.name,
                //     // title: Buffer.from(product.name ?? '', 'utf-8').toString('utf-8'),
                //     // title: encodeURI(product.name ?? ''),
                //     shop: shopMapping[product.shopid ?? 0],
                //     sku: faker.string.alpha({ length: 10, casing: 'upper' }),
                //     category_id: Number(product.catid),
                //     quantity: product.stock,
                //     buyturn: product.buyturn,
                //     price: product.price,
                //     old_price: product.price_before_discount,
                //     price_range_min: product.price_min,
                //     price_range_max: product.price_max,
                //     price_range_min_old: product.price_min_before_discount,
                //     price_range_max_old: product.price_max_before_discount,
                //     discount: (product.raw_discount ?? 0) / 100,
                //     // images: images,
                //     // options: options,
                //     // variants: variants,
                //     weight: product.weight,
                //     created_at: new Date(product.ctime ?? 0),
                // });
                id_product++;

                // console.log(product.itemid);
                // continue;
                const images: Image[] = product.images
                    ? await Promise.all(
                          product.images?.map(async (img: string) => {
                              return await factory(Image)().create({ image_url: img, product: newProduct });
                          }),
                      )
                    : [];

                const mapping: {
                    [index: string]: {
                        [index: string]: OptionValue;
                    };
                } = {};

                if (product?.options?.[0]?.name !== '') {
                    const options: Option[] = product.options
                        ? await Promise.all(
                              product.options?.map(async (opt) => {
                                  mapping[opt.name] = {};
                                  const values: OptionValue[] = await Promise.all(
                                      opt.values.map(async (value: string) => {
                                          const res = await factory(OptionValue)().create({ value_name: value });
                                          if (mapping[opt.name]) mapping[opt.name][value] = res;
                                          return res;
                                      }),
                                  );

                                  return await factory(Option)().create({
                                      name: opt.name,
                                      values: values,
                                      product: [newProduct],
                                  });
                              }),
                          )
                        : [];

                    // console.log(mapping);

                    const variants: ProductVariant[] = product.variants
                        ? await Promise.all(
                              product.variants.map(async (variant) => {
                                  return await factory(ProductVariant)().create({
                                      sku: faker.string.alpha({ length: 10, casing: 'upper' }),
                                      buyturn: variant.buyturn,
                                      quantity: variant.stock,
                                      name: variant.name,
                                      price: variant.price,
                                      old_price: variant.price_before_discount,
                                      options: variant.options.map((opt) => {
                                          return mapping[opt.option_name ?? ''][opt.value ?? ''];
                                      }),
                                      product: newProduct,
                                  });
                              }),
                          )
                        : [];
                }

                if (!product.shipping_channels) return;

                await Promise.all(
                    product.shipping_channels.map(async (id) => {
                        // const shipping: Shipping | undefined = id ? await shippingRepo.getChannelById(id) : undefined;

                        const random = Math.round(Math.random() * 10) + 3;

                        await factory(ShippingProductInfo)().create({
                            product: newProduct,
                            shipping: (await Shipping.findOne({ where: { shipping_channel_id: id } })) ?? undefined,
                            fee: Math.round((Math.random() * 10000 + 15000) / 1000) * 1000,
                            freeship: false,
                            estimated_delivery_days_max: random,
                            estimated_delivery_days_min: random - 2,
                        });

                        // return await this.repoShippingProduct
                        //     .create({
                        //         product,
                        //         shipping,
                        //         fee: info.fee,
                        //         freeship: info.freeship,
                        //         estimated_delivery_days_max: info.estimated_delivery_days_max,
                        //         estimated_delivery_days_min: info.estimated_delivery_days_min,
                        //     })
                        //     .save();
                    }),
                );
            } catch (error) {
                console.log(error);
            }
        }
    }
}
