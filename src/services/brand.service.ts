import { BrandRepository } from '~/repository/brand.repository';

export class BrandService {
    constructor(private readonly brandRepository: BrandRepository) { }

    async getBrands() {
        return this.brandRepository.getBrands();
    }
}
