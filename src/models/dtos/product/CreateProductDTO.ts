import { IsNotEmpty, Min, ValidateNested } from "class-validator";
import { AttributeDTO, PriceDTO } from "./ProductDTO";
import { Type } from "class-transformer";


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
     option_values?: CreateOptionValueDTO[];
     @IsNotEmpty()
     price?: PriceDTO;
     @IsNotEmpty()
     stock?: number;
}


export class ProductDimensionDTO {
     @IsNotEmpty()
     weight?: number;

     @IsNotEmpty()
     height?: number;
     @IsNotEmpty()
     width?: number;
     @IsNotEmpty()
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

     @IsNotEmpty()
     sku?: string;
     
     @IsNotEmpty()
     title?: string;
     
     @IsNotEmpty()
     description?: string;
     
     @IsNotEmpty()
     product_attributes?: AttributeDTO[];
     
     @IsNotEmpty()
     cat_id?: number;
     
     @IsNotEmpty()
     options?: CreateOptionDTO[];
     
     @IsNotEmpty()
     @ValidateNested()
     @Type(() => CreateVariantDTO)
     variants?: CreateVariantDTO[];
     
     @IsNotEmpty()
     product_price?: PriceDTO;
     
     @IsNotEmpty()
     @Min(1)
     stock?: number;
     
     @IsNotEmpty()
     discount?: number;
     
     @IsNotEmpty()
     image_urls?: string[];

     
     @IsNotEmpty()
     shipping_channels: number[];
     
     @IsNotEmpty()
     dimension: ProductDimensionDTO;
}
