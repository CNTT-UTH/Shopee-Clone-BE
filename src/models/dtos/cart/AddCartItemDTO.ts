import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, Max, Min } from 'class-validator';

export class AddCartItemDTO {
    @IsNumberString()
    @IsNotEmpty()
    product_id: number;

    @IsNumberString()
    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @IsNumberString()
    @IsNotEmpty()
    shop_id: number;

    @IsNumberString()
    @IsNotEmpty()
    product_variant_id: number;
}
