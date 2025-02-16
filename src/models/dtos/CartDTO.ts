import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CartDTO {
    username: string;
    @Expose()
    items: CartItemDTO[];
    @Expose()
    total: number;
    @Expose()
    total_before_discount: number;
}


export class CartItemDTO {
    product_id: number;
    product_variant_id: number;
    shop_id: number;
    quantity: number;
    selected_to_checkout: false;
}
