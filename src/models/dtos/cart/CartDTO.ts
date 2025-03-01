import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, Validate } from 'class-validator';
import { IsProductExist } from '~/validate/product.validate';

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
    shop_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

    selected_to_checkout: false;
}

export class UpdateQuantityDTO {
    @IsNotEmpty()
    @IsNumber()
    item_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
}
