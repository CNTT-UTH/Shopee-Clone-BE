import { AttributeRepository } from '~/repository/attribute.repository';

export class AttributeService {
    constructor(private readonly attributeRepository: AttributeRepository) {
        this.attributeRepository = new AttributeRepository();
    }

    async getAttributeByCateid(cate_id: number) {
        const result = await this.attributeRepository.getAttriByCateid(cate_id);

        return result;
    }
}
