import { Request, Response, NextFunction } from 'express';
import { CreateProductDTO } from '~/models/dtos/product/CreateProductDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { MediaService } from '~/services/media.service';
import { ProductService } from '~/services/product.service';

export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly mediaService: MediaService
    ) { }

    async uploadProductImages(req: Request, res: Response) {
        const result = await this.mediaService.uploadImagesProduct(req);

        res.send({
            success: true,
            mesage: null,
            result,
        });
    }

    async createProductInfos(req: Request<ParamsDictionary, any, Partial<CreateProductDTO>>, res: Response) {
        // Lấy CreateProductDTO
        const createProductDTO: Partial<CreateProductDTO> = req.body;
        const user_id: string = req?.decoded?._id as string;

        const result = await this.productService.createProduct(createProductDTO, user_id);
        // 
        res.send({
            success: true,
            mesage: null,
            result,
        });
    }

    async getProductById(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const result = await this.productService.getProduct(id);

        res.send({
            success: true,
            mesage: null,
            result,
        });
    }

    async getAllProducts(req: Request, res: Response) {

        const result = await this.productService.getAllProducts();

        res.send({
            success: true,
            mesage: null,
            result,
        });
    }
}

