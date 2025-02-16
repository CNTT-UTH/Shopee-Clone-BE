import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

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
    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    product_variant_id: number;

    @IsNotEmpty()
    shop_id: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    selected_to_checkout: false;
}
