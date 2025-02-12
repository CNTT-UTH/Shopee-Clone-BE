import { BrandRepository } from "~/repository/brand.repository";

class BrandService {
     private readonly brandRepository: BrandRepository;

     constructor () {
          this.brandRepository = new BrandRepository();
     }

     async getBrands(){
          return this.brandRepository.getBrands();
     }
}

export default new BrandService();