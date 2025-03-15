import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';

export class GetProductDTO {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    id: number;
}
