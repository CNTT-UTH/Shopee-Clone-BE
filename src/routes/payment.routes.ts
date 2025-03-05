import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import container from '~/container';
import { PaymentController } from '~/controllers/payment.controller';
import { asyncHandler } from '~/utils/asyncHandler';

const router = Router();

const api = makeInvoker<PaymentController>(() => container.resolve('paymentController'));

router.route('/methods').get(asyncHandler(api('getAllMethods')));

export default router;
