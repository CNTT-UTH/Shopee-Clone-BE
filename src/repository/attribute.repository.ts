import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { AttributeDTO } from '~/models/dtos/product/ProductDTO';
import { Attribute, AttributeValue } from '~/models/entity/attribute.entity';
import { Product } from '~/models/entity/product.entity';

export class AttributeRepository {
    private repoAttribute: Repository<Attribute>;
    private repoAttriValue: Repository<AttributeValue>;

    constructor() {
        this.repoAttribute = AppDataSource.getRepository(Attribute);
        this.repoAttriValue = AppDataSource.getRepository(AttributeValue);
    }

    async getAttriByCateid(cate_id: number) {
        const result = await this.repoAttribute.findBy({ cates: { cate_id: cate_id } });
        return result;
    }

    async getAttriById(id: number) {
        return await this.repoAttribute.findOneBy({ id });
    }

    async getProductAttributes(product: Product) {
        return await this.repoAttriValue.find({ where: { product: { _id: product._id } }, relations: ['attribute'] });
    }

    async addProductAttriValues(data: AttributeDTO[], product: Product) {
        const results: AttributeValue[] | undefined[] = await Promise.all(
            data.map(async (attri) => {
                const attribute: Attribute | null = attri.id ? await this.getAttriById(attri.id) : null;
                const value = await this.repoAttriValue
                    .create({
                        value: attri.value,
                        product,
                        attribute: attribute ?? undefined,
                    })
                    .save();

                return value;
            }),
        );

        return results;
    }
}
