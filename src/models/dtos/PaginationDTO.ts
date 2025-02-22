import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class Pagination {
    @IsNumber()
    @Type(() => Number)
    page: number;
    // offset: number;

    @IsNumber()
    @Type(() => Number)
    limit: number;

    prev_page?: number | null;
    cur_page?: number | null;
    next_page?: number | null;
    total_page?: number | null;
}
