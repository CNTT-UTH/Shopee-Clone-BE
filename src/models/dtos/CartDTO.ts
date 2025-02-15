
export class CartDTO {
    username: string;
    items: CartItemDTO[];
    total: number;
    total_before_discount: number;
}

export class CartItemDTO {
    product_id: number;
    product_variant_id: number;
    shop_id: number;
    quantity: number;
    selected_to_checkout: false;
}
