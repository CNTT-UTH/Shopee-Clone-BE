import { Exclude, Expose } from 'class-transformer';
import { CategoryDTO } from '../CategoryDTO';
import { ShippingInfoDTO } from '../ShippingDTO';

@Exclude()
export class ProductDTO {
    @Expose()
    product_id?: number;

    @Expose()
    title?: string;
    @Expose()   
    description?: string;

    @Expose()
    product_attributes?: AttributeDTO[];

    @Expose()
    cat_id?: number;
    @Expose()
    cates?: CategoryDTO[];

    review?: ProductReviewDTO;
    
    @Expose()
    options?: OptionsDTO[];
    @Expose()
    variants?: variantDTO[];

    @Expose()
    product_price?: PriceDTO[];

    @Expose()
    shipping_from?: string;

    @Expose()
    shipping_channel?: ShippingInfoDTO[];

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

export class AttributeDTO {
    id?: number;
    name?: string;
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

export class OptionsDTO {
    name?: string;
    value?: string[];
    image_urls?: string[];
    sold_out?: boolean[];

    // constructor(data: Partial<OptionsDTO>) {
    //     this.name = data.name;
    //     this.value = data.value;
    //     this.image_urls = data.image_urls;
    //     this.sold_out = data.sold_out;
    // }
}

export class variantDTO {
    product_id?: number;
    variant_id?: number;
    sku?: string;
    name?: string;
    price?: number;
    price_before_discount?: number;
    sold?: number;
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


