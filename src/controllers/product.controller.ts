import { Request, Response, NextFunction } from 'express';
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

    async createProductInfos(req: Request, res: Response) {
        // Lấy CreateProductDTO

        // const result = await mediaService.uploadProductInfos(req);
// 
        // res.send({
            // success: true,
            // mesage: null,
            // result,
        // });
    }
}

export default new ProductController();
