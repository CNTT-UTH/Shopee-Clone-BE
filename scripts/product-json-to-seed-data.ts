import path from 'path';
import fs from 'fs';
import { Shop, Product, ProductOption, ProductVariant } from './../src/seeders/data/model';

const SHOP_DATA_PATH = path.join(__dirname, '..', 'src', 'seeders', 'data', 'SHOP_DATA.JSON');
const PRODUCT_DATA_PATH = path.join(__dirname, '..', 'src', 'seeders', 'data', 'PRODUCT_DATA.JSON');
const RAW_JSON_ROOT = path.join(__dirname, '..', 'crawl', 'product');

const FILES = ['11035567.json', '11036030.json', '11036194.json', '11036525.json'];

const outputData = (path: string, data: Shop[] | Product[]) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('THÀNH CÔNG!', path);
        }
    });
};

interface Item {
    [index: string]: any;
}
const outputShop: Shop[] = [];
const outputProduct: Product[] = [];

const toShop = (data: Item[]) => {
    // console.log(data);
    if (!data) return;

    for (const elm of data) {
        const newElm: Shop = {
            shopid: elm?.['shopid'],
            shop_location: elm?.['shop_location'],
            shop_name: elm?.['shop_name'],
            avatar: 'https://down-bs-vn.img.susercontent.com/' + elm?.['image'],
        };

        outputShop.push(newElm);
    }
};

let id: number = 1;
const toProduct = (data: Item[], cate?: number) => {
    if (!data) return;

    for (const elm of data) {
        const newElm: Product = {
            // itemid: elm?.['itemid'],
            itemid: id++,
            shopid: elm?.['shopid'],
            name: elm?.['name'],
            images: elm?.['images']?.map((image: string) => 'https://down-bs-vn.img.susercontent.com/' + image),
            catid: cate ?? 0,
            price: Math.round(elm?.['price'] / 100000),
            price_before_discount: Math.round(elm?.['price_before_discount'] / 100000),
            price_min: Math.round(elm?.['price_min'] / 100000),
            price_max: Math.round(elm?.['price_max'] / 100000),
            price_min_before_discount: Math.round(elm?.['price_min_before_discount'] / 100000),
            price_max_before_discount: Math.round(elm?.['price_max_before_discount'] / 100000),
            raw_discount: elm?.['raw_discount'],
            options: elm?.['tier_variations']?.map((variant: any) => {
                return {
                    name: variant?.['name'],
                    values: variant?.['options'],
                };
            }),
            weight: Math.ceil(Math.random() * 1000),
            shipping_channels: [1, 2, 3],
            variants: [],
            stock: elm?.['stock'],
            ctime: elm?.['ctime'],
            sold: elm?.['sold'],
        };

        if (newElm.options?.length == 1) {
            newElm.variants = newElm.options[0].values?.map((value) => {
                return {
                    name: newElm.name + ` (${value})`,
                    options: [
                        {
                            option_name: newElm?.options?.[0]?.name,
                            value: value,
                        },
                    ],
                    price:
                        Math.ceil(
                            Math.ceil(Math.random() * ((newElm!.price_max as number) - (newElm!.price_min as number))) +
                            (newElm!.price_min as number) / 100,
                        ) * 100,
                    price_before_discount:
                        Math.ceil(
                            Math.ceil(
                                Math.random() *
                                ((newElm!.price_max_before_discount as number) -
                                    (newElm!.price_min_before_discount as number)),
                            ) +
                            (newElm!.price_min_before_discount as number) / 100,
                        ) * 100,
                };
            });

            if (newElm.variants) {
                newElm.variants[0].price = newElm.price_min;
                newElm.variants[0].price_before_discount = newElm.price_min_before_discount;
                newElm.variants[(newElm.variants.length ?? 1) - 1].price = newElm.price_max;
                newElm.variants[(newElm.variants.length ?? 1) - 1].price_before_discount =
                    newElm.price_max_before_discount;
            }
        } else {
            interface options_mapping_type {
                [index: string]: string[];
            }
            const options_mapping: options_mapping_type | undefined = {};

            newElm.options?.map((opt) => {
                options_mapping[opt.name] = opt.values;
            });

            if (!options_mapping) continue;
            if (!newElm.options) continue;

            for (const value1 of options_mapping[newElm.options[0].name]) {
                for (const value2 of options_mapping[newElm.options[1].name]) {
                    if (!newElm.variants) continue;

                    newElm.variants.push({
                        name: newElm.name + ` (${value1}, ${value2})`,
                        options: [
                            {
                                option_name: newElm?.options?.[0]?.name,
                                value: value1,
                            },
                            {
                                option_name: newElm?.options?.[1]?.name,
                                value: value2,
                            },
                        ],
                        price:
                            Math.ceil(
                                Math.ceil(
                                    Math.random() * ((newElm!.price_max as number) - (newElm!.price_min as number)),
                                ) +
                                (newElm!.price_min as number) / 100,
                            ) * 100,
                        price_before_discount:
                            Math.ceil(
                                Math.ceil(
                                    Math.random() *
                                    ((newElm!.price_max_before_discount as number) -
                                        (newElm!.price_min_before_discount as number)),
                                ) +
                                (newElm!.price_min_before_discount as number) / 100,
                            ) * 100,
                    });
                }
            }
        }

        const base_stock: number = Math.round(
            newElm.variants && newElm.variants?.length > 0 ? (newElm.stock ?? 0) / newElm.variants.length : 0,
        );
        const base_buyturn: number = Math.round(
            newElm.variants && newElm.variants?.length > 0 ? (newElm.buyturn ?? 0) / newElm.variants.length : 0,
        );

        for (const variant of newElm.variants ?? []) {
            variant.buyturn = base_buyturn;
            variant.stock = base_stock;
        }

        if (newElm.variants && newElm.variants?.length > 0) {
            newElm.variants[0].buyturn = (newElm.buyturn ?? 0) - (newElm.variants.length - 1) * base_buyturn;
            newElm.variants[0].stock = (newElm.stock ?? 0) - (newElm.variants.length - 1) * base_stock;
        }

        outputProduct.push(newElm);
    }
};

for (const id of FILES) {
    fs.readFile(path.join(RAW_JSON_ROOT, id), 'utf-8', (err, data) => {
        if (err) throw err;

        const obj = JSON.parse(data);
        console.log(id);

        // toShop(obj?.['data']?.['sections']?.[0]?.['data']?.['item']);
        toProduct(obj?.['data']?.['sections']?.[0]?.['data']?.['item'], Number(id.split('.')[0]));

        if (id === '11036525.json') outputData(PRODUCT_DATA_PATH, outputProduct);
        // if (id === '11036525.json') outputData(SHOP_DATA_PATH, outputShop);
    });
}
