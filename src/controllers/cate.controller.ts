import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '~/services/cate.service';

export class CategoryController {
    constructor(private readonly cateService: CategoryService) {}
    async getCateTree(req: Request, res: Response) {
        const result = await this.cateService.getCateTree();

        res.send({
            success: true,
            message: null,
            result,
        });
    }
}
