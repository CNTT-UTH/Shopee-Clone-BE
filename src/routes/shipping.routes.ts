import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import container from '~/container';
import { ShippingController } from '~/controllers/shipping.controller';
import { asyncHandler } from '~/utils/asyncHandler';

const router = Router();
const api = makeInvoker<ShippingController>(() => container.resolve('shippingController'));

router.route('/get-shipping-channels').get(asyncHandler(api('getAllShippingChannels')));

router.route('/couting-shipping-fees').post(asyncHandler(api('countingRates')));

export default router;
