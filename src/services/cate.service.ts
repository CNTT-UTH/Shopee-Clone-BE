import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CategoryDTO } from '~/models/dtos/CategoryDTO';
import { Category } from '~/models/entity/category.entity';
import { CategoryRepository } from '~/repository/cate.repository';

class CategoryService {
    private readonly cateRepository: CategoryRepository;

    constructor() {
        this.cateRepository = new CategoryRepository();
    }

    async getCateTree() {
        const rootCates: Category[] = await this.cateRepository.getAllRootCate();
        const cateTree: CategoryDTO[] = await Promise.all(
            rootCates.map(async (cate) => {
                const cateDTO: CategoryDTO = plainToInstance(CategoryDTO, cate);
                const childCates: Category[] = await this.cateRepository.getAllChildrenCate(cate.cate_id);
                const childCateDTO: CategoryDTO[] = [];
                childCates.map(async (cate) => {
                    childCateDTO.push(plainToInstance(CategoryDTO, cate));
                });
                cateDTO.childrens = childCateDTO;
                return cateDTO;
            }),
        ).then((res) => res);

        return cateTree;
    }
}

export default new CategoryService();
