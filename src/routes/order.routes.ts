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

router.route('/checkout').post(accessTokenValidator, asyncHandler(api('handleCheckout')));

router
    .route('/checkout/:session_checkout_id')
    /**
     * Description. Get all products
     * Path: /checkout
     * Method: GET
     * Query: {  }
     */
    .get(accessTokenValidator, validationMiddleware(SessionId, 'params'), asyncHandler(api('getCheckoutInfo')));

router
    .route('/update-order-info/:session_checkout_id')
    /**
     * Description. Get all products
     * Path: /checkout
     * Method: POST
     */
    .patch(
        accessTokenValidator,
        validationMiddleware(SessionId, 'params'),
        validationMiddleware(UpdateCheckout, 'body'),
        asyncHandler(api('updateCheckout')),
    );

router
    .route('/place-order/:session_checkout_id')
    .post(accessTokenValidator, validationMiddleware(SessionId, 'params'), asyncHandler(api('placeOrder')));

router.route('/get-user-orders').get(accessTokenValidator, asyncHandler(api('getUserOrders')));

router.route('/:order_id').get(asyncHandler(api('getOrder')));

export default router;
