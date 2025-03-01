import { BASE_FILTER_BY } from "~/constants/productFilter";

export class Filter {
    by: BASE_FILTER_BY;
    order: 'asc' | 'desc';

    price_min?: number;
    price_max?: number;
}
