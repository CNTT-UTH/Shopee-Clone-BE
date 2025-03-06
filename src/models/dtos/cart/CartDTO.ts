import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, Validate } from 'class-validator';
import { IsProductExist } from '~/validate/product.validate';

@Exclude()
export class CartDTO {
    username: string;

    @Expose()
    @Type(() => CartItemDTO)
    items: CartItemDTO[];

    @Expose()
    total: number;

    @Expose()
    total_before_discount: number;
}

@Exclude()
export class CartItemDTO {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @Expose()
    product_variant_id: number;

    @IsNotEmpty()
    @Expose()
    shop_id: number;

    @Expose()
    block_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Expose()
    quantity: number;

    @Expose()
    selected_to_checkout: boolean;

    price?: number;
    price_before_discount?: number;
    total_price?: number;
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
