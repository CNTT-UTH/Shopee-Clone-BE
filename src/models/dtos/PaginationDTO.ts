import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class Pagination {
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page: number;
    // offset: number;

    @IsNumber()
    @Min(20)
    @Max(30)
    @Type(() => Number)
    limit: number;

    prev_page?: number | null;
    cur_page?: number | null;
    next_page?: number | null;
    total_page?: number | null;
}
