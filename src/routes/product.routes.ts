import { Router } from 'express';
import { Role } from '~/constants/enums';
import productController from '~/controllers/product.controller';
import { accessTokenValidator, authorizeRole, isShop, platformValidator } from '~/middlewares/auth.middleware';
import { asyncHandler } from '~/utils/asyncHandler';

const router = Router();

router
    .route('/upload-product-images')
    /**
     * Description. Upload product images
     * Path: /upload-product-images
     * Method: POST
     * Content-type: multipart/form-data
     * Headers: { Authorization: string, User-Agent: string }
     */
    .post(platformValidator, accessTokenValidator, isShop(), asyncHandler(productController.uploadProductImages));

router
    .route('/create-product-infos')
    /**
     * Description. Create product infos
     * Path: /create-product-infos
     * Method: POST
     * Headers: { Authorization: string, User-Agent: string }
     * Body: UploadProductDTO
     */
    .post(platformValidator, accessTokenValidator, isShop(), asyncHandler(productController.createProductInfos));

export default router;
