import path from 'path';
import fs from 'fs';

const SHOP_DATA_PATH = path.join(__dirname, '..', 'crawl', 'SHOP_DATA.JSON');
const PRODUCT_DATA_PATH = path.join(__dirname, '..', 'crawl', 'PRODUCT_DATA.JSON');
const RAW_JSON_ROOT = path.join(__dirname, '..', 'crawl', 'product');

const FILES = ['11036030.json', '11036194.json', '11036525_1.json', '11036525.json'];

class Shop {
    shopid?: number;
    shop_location?: string;
    shop_name?: string;
}

class Product {
    itemid?: number;
    shopid?: number;
    name?: string;
    images?: string[];
    catid?: string;
    price?: number;
    price_before_discount?: number;
    price_min?: number;
    price_max?: number;
    price_min_before_discount?: number;
    price_max_before_discount?: number;
    raw_discount?: number;
    options?: ProductOption[];
    weight?: number;
    shipping_channels?: number[];
    variants?: ProductVariant[];
    stock?: number;
    buyturn?: number;
    ctime?: number;
    sold?: number;
}

class ProductOption {
    name: string;
    values: string[];
}

class OptionValue {
    option_name?: string;
    value?: string;
}

class ProductVariant {
    name?: string;
    options: OptionValue[];
    price?: number;
    price_before_discount?: number;
    stock?: number;
    buyturn?: number;
    image_url?: string;
}

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
        };

        outputShop.push(newElm);
    }
};

const toProduct = (data: Item[]) => {
    if (!data) return;

    for (const elm of data) {
        const newElm: Product = {
            itemid: elm?.['itemid'],
            shopid: elm?.['shopid'],
            name: elm?.['name'],
            images: elm?.['images']?.map((image: string) => 'https://down-bs-vn.img.susercontent.com/' + image),
            catid: elm?.['catid'],
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

                    newElm.variants[0] = {
                        name: newElm.name + ` (${value1}, ${value2})`,
                        options: [
                            {
                                option_name: newElm?.options?.[0]?.name,
                                value: value1,
                            },
                            {
                                option_name: newElm?.options?.[0]?.name,
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
                    };
                }
            }
        }

        outputProduct.push(newElm);
    }
};

for (const id of FILES) {
    fs.readFile(path.join(RAW_JSON_ROOT, id), 'utf-8', (err, data) => {
        if (err) throw err;

        const obj = JSON.parse(data);
        // console.log(obj);

        // toShop(obj?.['data']?.['sections']?.[0]?.['data']?.['item']);
        toProduct(obj?.['data']?.['sections']?.[0]?.['data']?.['item']);

        if (id === '11036525.json') outputData(PRODUCT_DATA_PATH, outputProduct);
    });
}
