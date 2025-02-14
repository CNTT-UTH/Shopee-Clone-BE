import { Request, Response, NextFunction } from 'express';
import { CreateProductDTO } from '~/models/dtos/product/CreateProductDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import mediaService from '~/services/media.service';
import productService from '~/services/product.service';
class ProductController {
    async uploadProductImages(req: Request, res: Response) {
        const result = await mediaService.uploadImagesProduct(req);

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

        const result = await productService.createProduct(createProductDTO, user_id);
        // 
        res.send({
            success: true,
            mesage: null,
            result,
        });
    }
}

export default new ProductController();
