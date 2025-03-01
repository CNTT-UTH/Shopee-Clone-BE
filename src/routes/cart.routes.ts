import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import container from '~/container';
import { CartController } from '~/controllers/cart.controller';
import { accessTokenValidator, platformValidator } from '~/middlewares/auth.middleware';
import { validationMiddleware } from '~/middlewares/validation.middleware';
import { CartItemDTO, UpdateQuantityDTO } from '~/models/dtos/cart/CartDTO';
import { asyncHandler } from '~/utils/asyncHandler';

const router = Router();
const api = makeInvoker<CartController>(() => container.resolve('cartController'));

router.route('/get-my-cart').get(platformValidator, accessTokenValidator, asyncHandler(api('getMyCart')));

router
    .route('/add-or-update-item')
    .post(
        platformValidator,
        accessTokenValidator,
        validationMiddleware(CartItemDTO),
        asyncHandler(api('addOrUpdateItem')),
    );

router.route('/remove-item').delete(platformValidator, accessTokenValidator, asyncHandler(api('removeItem')));

export default router;
