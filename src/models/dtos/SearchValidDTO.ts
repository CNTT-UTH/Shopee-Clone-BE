import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CategoryId {
    @IsNotEmpty()
    @IsNumber()
    cate_id: number;
}

export class Keyword {
    @IsNotEmpty()
    @IsString()
    keyword: string;
}