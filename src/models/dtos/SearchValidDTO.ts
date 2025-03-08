import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CategoryId {
    @IsNotEmpty()
    @IsNumberString()
    cate_id: number;
}

export class Keyword {
    @IsNotEmpty()
    @IsString()
    keyword: string;
}
