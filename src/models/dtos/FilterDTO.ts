export class Filter {
    by: 'price' | 'ctime';
    order: 'asc' | 'desc';

    price_min?: number;
    price_max?: number;
}
