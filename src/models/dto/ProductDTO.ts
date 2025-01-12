import { CategoryDTO } from "./CategoryDTO";

export class ProductDTO {
    product_id?: string;
    title?: string;
    description?: string;

    product_attributes?: AttributeDTO[];

    cat_id?: string;
    cates?: CategoryDTO[];

    review?: ProductReviewDTO;
    options?: OptionsDTO[];
    variants?: variantDTO[];

    product_price?: PriceDTO[];

    shipping_from?: string;
    shipping_channel?: ShippingDTO[];
}

export class AttributeDTO {
    id?: string;
    name?: string;
    value?: string;
    brand_id?: string;
    url?: string;
}

export class ProductReviewDTO {
    cmt_count?: number;
    liked_count?: number;
    rating_count?: number[]; // [0]: tổng rating, 1->5 tổng ratings với số sao tương ứng
    rating_star?: number;
    global_sold?: number;
}

export class OptionsDTO {
    name?: string;
    value?: string[];
    image_urls?: string[];
    sold_out?: boolean[];
}

export class variantDTO {
    product_id?: string;
    sku?: string;
    name?: string;
    price?: number;
    price_before_discount?: number;
    sold?: number;
    stock?: number; //số lượng tồn kho
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
}

export class ShippingDTO {
    channel_id?: number;
    name?: number; // Ex: Nhanh, Hỏa tốc,...

    fee?: number;
    freeship?: boolean; // Miễn phí vận chuyển
    unsupport?: boolean; // Không hổ trợ

    estimated_delivery_date_from?: string; // timestamp
    estimated_delivery_date_to?: string; // timestamp
    delivery_text?: string; // Ex: Nhận từ 15 Th01 - 16 Th01

    is_fastest?: boolean;
}
