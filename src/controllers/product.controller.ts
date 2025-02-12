import { Request, Response, NextFunction } from 'express';
import { CreateProductDTO } from '~/models/dtos/product/CreateProductDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import mediaService from '~/services/media.service';
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
        console.log(createProductDTO);

        // const result = await mediaService.uploadProductInfos(req);
        // 
        res.send({
            success: true,
            mesage: null,
            createProductDTO,
        });
    }
}

export default new ProductController();
