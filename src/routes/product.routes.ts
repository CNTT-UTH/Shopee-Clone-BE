import { Router } from 'express';
import { Role } from '~/constants/enums';
import productController from '~/controllers/product.controller';
import { accessTokenValidator, authorizeRole, isShop, platformValidator } from '~/middlewares/auth.middleware';
import { validationMiddleware } from '~/middlewares/validation.middleware';
import { CreateProductDTO } from '~/models/dtos/product/CreateProductDTO';
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
    .route('/create-new-product')
    /**
     * Description. Create product infos
     * Path: /create-new-product
     * Method: POST
     * Headers: { Authorization: string, User-Agent: string }
     * Body: UploadProductDTO
     */
    .post(platformValidator, accessTokenValidator, validationMiddleware(CreateProductDTO), isShop(), asyncHandler(productController.createProductInfos));

router
    .route('/all')
    /**
     * Description. Get all products
     * Path: /all'
     * Method: GET
     */
    .get(asyncHandler(productController.getAllProducts));

router
    .route('/:id')
    /**
     * Description. Get produc by id
     * Path: /:id'
     * Method: GET
     */
    .get(asyncHandler(productController.getProductById));

export default router;
