import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Min,
    ValidateBy,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { AttributeDTO, PriceDTO } from './ProductDTO';
import { Type } from 'class-transformer';

export class CreateOptionDTO {
    name: string;
    value: string[];
}

export class CreateOptionValueDTO {
    name: string;
    value: string;
}

export class CreateVariantDTO {
    @IsNotEmpty()
    name?: string;
    @IsNotEmpty()
    sku?: string;
    @IsNotEmpty()
    option_values: CreateOptionValueDTO[];
    @IsNotEmpty()
    price?: PriceDTO;
    @IsNotEmpty()
    stock?: number;
}

export class ProductDimensionDTO {
    @IsNotEmpty()
    @IsNumber()
    weight?: number;

    height?: number;
    width?: number;
    length?: number;
}

/**
 * {
 *   sku
 *   title
 *   description
 *   product_attributes
 *   cat_id
 *   options
 *   variants
 *   product_price
 *   stock
 *   discount
 *   image_urls
 *   shipping_channels
 *   dimension
 * }
 */
export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    sku?: string;

    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => AttributeDTO)
    product_attributes?: AttributeDTO[];

    @IsNotEmpty()
    cate_id?: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMaxSize(2)
    @ValidateNested({ each: true })
    @Type(() => CreateOptionDTO)
    options?: CreateOptionDTO[];

    @ValidateIf((object) => object?.options?.length !== 0)
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateVariantDTO)
    variants?: CreateVariantDTO[];

    @IsNotEmpty()
    @IsNumber()
    @Min(0.1)
    price: number;

    @ValidateIf((o) => o.variants.length === 0)
    @IsNotEmpty()
    @Min(1)
    stock?: number;

    @IsNotEmpty()
    @IsNumber()
    discount?: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(3)
    @ArrayMaxSize(3)
    image_urls?: string[];

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    shipping_channels: number[];

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductDimensionDTO)
    dimension: ProductDimensionDTO;
}
