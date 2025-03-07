import { Exclude, Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { CategoryDTO, CategoryLevelDTO } from '../CategoryDTO';
import { ShippingInfoDTO } from '../ShippingDTO';
import { IsNotEmpty } from 'class-validator';
import { ShopDTO } from '../ShopDTO';
import { Image } from '~/models/entity/image.entity';
import { OptionValue, ProductVariant } from '~/models/entity/variant.entiity';

@Exclude()
export class AttributeDTO {
    @Expose()
    @IsNotEmpty()
    id?: number;

    @Expose({ name: 'attribute' })
    @Transform(({ value }) => value?.name)
    name?: string;

    @Expose({ name: 'value' })
    @IsNotEmpty()
    value?: string;

    brand_id?: string;

    // constructor(data: Partial<AttributeDTO> = {}) {
    //     this.id = data.id;
    //     this.name = data.name;
    //     this.value = data.value;
    //     this.brand_id = data.brand_id;
    //     this.url = data.url;
    // }
}

export class ProductReviewDTO {
    cmt_count?: number;
    liked_count?: number;
    rating_count?: number[]; // [0]: tổng rating, 1->5 tổng ratings với số sao tương ứng
    rating_star?: number;
    global_sold?: number;

    // constructor(data: Partial<ProductReviewDTO> = {}) {
    //     this.cmt_count = data.cmt_count ?? 0;
    //     this.liked_count = data.liked_count ?? 0;
    //     this.rating_count = data.rating_count ?? [0, 0, 0, 0, 0, 0];
    //     this.rating_star = data.rating_star ?? 0;
    //     this.global_sold = data.global_sold ?? 0;
    // }
}

@Exclude()
export class OptionsDTO {
    @Expose()
    name?: string;

    @Expose({ name: 'values' })
    @Transform(({ value }) => {
        return value?.map((v: OptionValue) => {
            if (v.value_name === '') return null;
            return v.value_name;
        });
    })
    value?: string[];

    image_urls?: string[];
    // sold_out?: boolean[];

    // constructor(data: Partial<OptionsDTO>) {
    //     this.name = data.name;
    //     this.value = data.value;
    //     this.image_urls = data.image_urls;
    //     this.sold_out = data.sold_out;
    // }
}

@Exclude()
export class VariantDTO {
    product_id?: number;

    @Expose()
    variant_id?: number;

    @Expose()
    sku?: string;

    @Expose()
    name?: string;

    @Expose()
    price?: number;

    @Expose({ name: 'old_price' })
    price_before_discount?: number;

    @Expose({ name: 'buyturn' })
    sold?: number;

    @Expose({ name: 'quantity' })
    stock?: number; //số lượng tồn kho

    // constructor(data: Partial<variantDTO>) {
    //     this.product_id = data.product_id;
    //     this.sku = data.sku;
    //     this.name = data.name;
    //     this.price = data.price;
    //     this.price_before_discount = data.price_before_discount;
    //     this.sold = data.sold;
    //     this.stock = data.stock;
    // }
}

export class PriceDTO {
    discount?: number;
    price?: number;

    price_before_discount?: number;

    /* đối với sản phẩm có nhiều biến thể */
    range_min?: number;
    range_max?: number;
    range_min_before_discount?: number;
    range_max_before_discount?: number;

    // constructor(data: Partial<PriceDTO>) {
    //     this.discount = data.discount;
    //     this.price = data.price;
    //     this.price_before_discount = data.price_before_discount;
    //     this.range_min = data.range_min;
    //     this.range_max = data.range_max;
    //     this.range_min_before_discount = data.range_min_before_discount;
    //     this.range_max_before_discount = data.range_max_before_discount;
    // }
}

@Exclude()
export class ProductDTO {
    @Expose({ name: '_id' })
    product_id?: number;

    @Expose()
    title?: string;
    @Expose()
    description?: string;

    @Expose({ name: 'attributes' })
    @Type(() => AttributeDTO)
    product_attributes?: AttributeDTO[];

    @Expose()
    cate_id?: number;

    @Expose({ name: 'categories' })
    @Type(() => CategoryDTO)
    cates?: CategoryDTO[];

    cate_levels: CategoryLevelDTO;

    review?: ProductReviewDTO;

    @Expose({ name: 'options' })
    @Transform(({ value }) => {
        if (value[0].name === '') {
            value = [];
        }

        return plainToInstance(OptionsDTO, value);
    })
    options?: OptionsDTO[];

    @Expose({ name: 'variants' })
    @Type(() => VariantDTO)
    variants?: VariantDTO[];

    @Expose()
    @Type(() => PriceDTO)
    @Transform(({ obj }) => ({
        discount: obj.discount,
        price: obj.price,
        price_before_discount: obj.old_price,
        range_min: obj.price_range_min,
        range_max: obj.price_range_max,
        range_min_before_discount: obj.price_range_min_old,
        range_max_before_discount: obj.price_range_max_old,
    }))
    product_price?: PriceDTO;

    @Expose()
    @Transform(({ obj }) => obj.shop?.shop_location)
    shipping_from?: string;

    @Expose({ name: 'shipping_channels' })
    @Type(() => ShippingInfoDTO)
    shipping_channel?: ShippingInfoDTO[];

    @Expose({ name: 'image' })
    image?: string;

    @Expose({ name: 'images' })
    @Transform(({ value }) => value?.map((v: Image) => v.image_url))
    image_urls?: string[];

    @Expose({ name: 'shop' })
    @Type(() => ShopDTO)
    shop: ShopDTO;

    shop_id: string;

    @Expose({ name: 'sku' })
    sku: string;

    @Expose()
    @Transform(({ obj }) => {
        const value = obj.variants;
        type NestedObject = { [index: string]: number | NestedObject };
        const mapping: NestedObject = {};

        value?.map((variant: ProductVariant) => {
            if (variant.options.length == 1) {
                if (variant.options[0].value_name !== '') mapping[variant.options[0].value_name] = variant.variant_id;
            } else {
                // mapping[variant.options[0].value_name] = { [variant.options[1].value_name]: variant.variant_id };
                // mapping[variant.options[1].value_name] = { [variant.options[0].value_name]: variant.variant_id };
                if (!mapping[variant.options[0].value_name]) mapping[variant.options[0].value_name] = {};
                // if (!mapping[variant.options[1].value_name]) mapping[variant.options[1].value_name] = {};

                (mapping[variant.options[0].value_name] as NestedObject)[variant.options[1].value_name] =
                    variant.variant_id;
                // (mapping[variant.options[1].value_name] as NestedObject)[variant.options[0].value_name] =
                //     variant.variant_id;
            }
        });

        console.log(mapping);

        return mapping;
    })
    variants_mapping: object;
    // constructor(data: Partial<ProductDTO> = {}) {
    //     this.product_id = data.product_id;
    //     this.title = data.title;
    //     this.description = data.description;

    //     this.product_attributes = data.product_attributes || [];
    //     this.cat_id = data.cat_id;
    //     this.cates = data.cates || [];

    //     this.review = data.review ? new ProductReviewDTO(data.review) : undefined;
    //     this.options = data.options ? data.options.map((opt) => new OptionsDTO(opt)) : [];
    //     this.variants = data.variants ? data.variants.map((variant) => new variantDTO(variant)) : [];

    //     this.product_price = data.product_price ? data.product_price.map((price) => new PriceDTO(price)) : [];
    //     this.shipping_from = data.shipping_from;
    //     this.shipping_channel = data.shipping_channel
    //         ? data.shipping_channel.map((channel) => new ShippingDTO(channel))
    //         : [];
    // }
}
