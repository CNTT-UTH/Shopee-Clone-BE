import { Router } from "express";
import shippingController from "~/controllers/shipping.controller";
import { asyncHandler } from "~/utils/asyncHandler";

const router = Router();

router
     .route('/get-shipping-channels')
     .get(asyncHandler(shippingController.getAllShippingChannels));

router
     .route('/couting-shipping-fees')
     .get(asyncHandler(shippingController.countingRates));

export default router;