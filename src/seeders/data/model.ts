export class Shop {
    shopid?: number;
    shop_location?: string;
    shop_name?: string;
    avatar?: string;
}

export class Product {
    itemid?: number;
    shopid?: number;
    name?: string;
    images?: string[];
    catid?: number;
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

export class ProductOption {
    name: string;
    values: string[];
}

export class OptionValue {
    option_name?: string;
    value?: string;
}

export class ProductVariant {
    name?: string;
    options: OptionValue[];
    price?: number;
    price_before_discount?: number;
    stock?: number;
    buyturn?: number;
    image_url?: string;
}
