import { Request, Response } from 'express';
import { BrandService } from '~/services/brand.service';

export class BrandController {
    constructor(private readonly brandService: BrandService) {}
    async getBrands(req: Request, res: Response) {
        const result = await this.brandService.getBrands();

        res.send({
            success: true,
            message: null,
            result,
        });
    }
}
