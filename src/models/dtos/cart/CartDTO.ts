import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, Validate } from 'class-validator';

@Exclude()
export class CartDTO {
    username: string;

    @Expose({ name: 'cart_items' })
    @Type(() => CartItemDTO)
    items: CartItemDTO[];

    @Expose()
    total: number;

    @Expose()
    total_before_discount: number;

    @Expose()
    @Transform(({ obj }) => {
        const result: number[] = [];
        const items: any = obj.cart_items;

        items.map((i: any) => {
            const id: number = i.shop_id;
            if (!result.includes(id)) result.push(id);
        });

        return result;
    })
    shops: number[];
}

@Exclude()
export class CartItemDTO {
    @Expose()
    id: number;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @Expose()
    product_variant_id: number;

    @Expose()
    @Transform(({ obj }) => {
        if (obj.productvariant) {
            return obj.productvariant.quantity;
        } else {
            return obj.product.quantity;
        }
    })
    stock: number;

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

    @Expose()
    price?: number;
    @Expose()
    price_before_discount?: number;
    @Expose()
    total_price?: number;

    @Expose({ name: 'product' })
    @Transform(({ value }) => value?.title)
    product_name: string;

    @Expose({ name: 'productvariant' })
    @Transform(({ value }) => value?.name)
    variant_name: string;

    @Expose()
    @Transform(({ obj }) => obj?.product?.image)
    image: string;

    @Expose({ name: 'shop' })
    @Transform(({ value }) => value?.name)
    shop_name: string;

    @Expose()
    @Transform(({ obj }) => obj?.shop?.avatar)
    shop_avatar: string;
}
