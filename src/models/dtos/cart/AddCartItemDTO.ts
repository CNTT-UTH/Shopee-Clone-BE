import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from 'class-validator';

export class AddCartItemDTO {
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    shop_id: number;

    @IsNumber()
    @IsOptional()
    product_variant_id: number;
}
