import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import container from '~/container';
import { OrderController } from '~/controllers/order.controller';
import { accessTokenValidator } from '~/middlewares/auth.middleware';
import { asyncHandler } from '~/utils/asyncHandler';

const router = Router();

const api = makeInvoker<OrderController>(() => container.resolve('orderController'));

router.route('/checkout').post(accessTokenValidator, asyncHandler(api('handleCheckout')))

export default router;
