import { Request, Response, NextFunction } from 'express';
import mediaService from '~/services/media.service';
class ProductController {
    async uploadProductImages(req: Request, res: Response) {
        const result = mediaService.uploadImagesProduct(req);

        res.send({
            success: true,
            mesage: null,
            result,
        });
    }
}

export default new ProductController();
