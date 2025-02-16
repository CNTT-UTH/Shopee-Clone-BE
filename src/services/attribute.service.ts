import { AttributeRepository } from '~/repository/attribute.repository';

export class AttributeService {
    private readonly attributeRepository: AttributeRepository;

    constructor() {
        this.attributeRepository = new AttributeRepository();
    }

    async getAttributeByCateid(cate_id: number) {
        const result = await this.attributeRepository.getAttriByCateid(cate_id);

        return result;
    }
}
