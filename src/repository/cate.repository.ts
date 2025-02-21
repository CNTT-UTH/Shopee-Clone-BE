import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { CategoryDTO, CategoryLevelDTO } from '~/models/dtos/CategoryDTO';
import { Category } from '~/models/entity/category.entity';

export class CategoryRepository {
    private repo: Repository<Category>;

    constructor() {
        this.repo = AppDataSource.getRepository(Category);
    }

    async findOneByCateId(cate_id: number) {
        return await this.repo.findOneBy({ cate_id: cate_id });
    }

    async getAllRootCate() {
        const cates = this.repo.findBy({ level: 1 });
        return cates;
    }

    async getAllChildrenCate(parent_id: number) {
        const cates = this.repo.findBy({ parent_cate_id: parent_id });
        return cates;
    }

    async getPathTreeFromLeafCate(leaf_id: number): Promise<CategoryLevelDTO> {
        const cateLevelDTO: CategoryLevelDTO = {};
        const getRoot = async (child_id: number) => {
            const child = await this.repo.findOneBy({ cate_id: child_id });

            if (!child) return;

            cateLevelDTO[child?.level] = plainToInstance(CategoryDTO, child);

            if (child.parent_cate_id) return getRoot(child.parent_cate_id);
        };

        await getRoot(leaf_id);

        return cateLevelDTO;
    }

    async getCateList(leaf_id: number): Promise<number[]> {
        const cateList: number[] = [];

        const getRoot = async (child_id: number) => {
            const child = await this.repo.findOneBy({ cate_id: child_id });

            if (!child) return;

            cateList.push(child_id);

            if (child.parent_cate_id) return getRoot(child.parent_cate_id);
        };

        await getRoot(leaf_id);

        return cateList;
    }
}
