import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import container from '~/container';
import { ShopController } from '~/controllers/shop.controller';
import { accessTokenValidator, isShop } from '~/middlewares/auth.middleware';
import { validationMiddleware } from '~/middlewares/validation.middleware';
import { RegisterInfoShopDTO } from '~/models/dtos/ShopDTO';
import { asyncHandler } from '~/utils/asyncHandler';

const router = Router();
const api = makeInvoker<ShopController>(() => container.resolve('shopController'))

router
    .route('/register')
    /**
     * Description. Register shop
     * Path: /register
     * Method: POST
     * Headers: { Authorization: string, User-Agent: string }
     * Body:
     * {
     *    name: string;
     *    phone: string;
     *    pickup_address: AddressDTO;
     * }
     */
    .post(accessTokenValidator, validationMiddleware(RegisterInfoShopDTO), asyncHandler(api('register')));

router
    .route('')
    /**
     * Description. Get shop info
     * Path:
     * Method: GET
     * Headers: { Authorization: string, User-Agent: string }
     */
    .get(accessTokenValidator, isShop(), asyncHandler(api('getInfo')));

router
    .route('/:shop_id')
    /**
     * Description. Get shop info
     * Path:
     * Method: GET
     * Headers: { Authorization: string, User-Agent: string }
     */
    .get(asyncHandler(api('getInfoById')));

export default router;
