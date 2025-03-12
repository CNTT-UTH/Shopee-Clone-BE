import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString, Max, Min } from 'class-validator';

export class AddCartItemDTO {
    @IsString()
    @IsNotEmpty()
    product_id: number;

    @IsString()
    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @IsString()
    @IsNotEmpty()
    shop_id: number;

    @IsString()
    @IsNotEmpty()
    product_variant_id: number;
}
