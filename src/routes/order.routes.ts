import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import container from '~/container';
import { OrderController } from '~/controllers/order.controller';
import { accessTokenValidator } from '~/middlewares/auth.middleware';
import { validationMiddleware } from '~/middlewares/validation.middleware';
import { SessionId, UpdateCheckout } from '~/models/dtos/order/checkout';
import { asyncHandler } from '~/utils/asyncHandler';

const router = Router();

const api = makeInvoker<OrderController>(() => container.resolve('orderController'));

router
    .route('/checkout')
    /**
     * Description. Get all products
     * Path: /checkout
     * Method: GET
     * Query: {  }
     */
    .get(accessTokenValidator, validationMiddleware(SessionId, 'query'), asyncHandler(api('getCheckoutInfo')))
    .post(accessTokenValidator, asyncHandler(api('handleCheckout')));

router
    .route('/update-order-info/:session_checkout_id')
    /**
     * Description. Get all products
     * Path: /checkout
     * Method: POST
     */
    .post(
        accessTokenValidator,
        validationMiddleware(SessionId, 'params'),
        validationMiddleware(UpdateCheckout, 'body'),
        asyncHandler(api('updateCheckout')),
    );

router
    .route('/place-order/:session_checkout_id')
    .post(accessTokenValidator, validationMiddleware(SessionId, 'params'), asyncHandler(api('placeOrder')));

export default router;
