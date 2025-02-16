import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { Brand } from '~/models/entity/brand.entity';

export class BrandRepository {
    private repo: Repository<Brand>;

    constructor() {
        this.repo = AppDataSource.getRepository(Brand);
    }

    async getBrands() {
        return await this.repo.find();
    }

    async getBrandById(id: string) {
        return await this.repo.findOneBy({ _id: id });
    }
}
