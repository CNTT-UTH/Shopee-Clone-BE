import { makeInvoker } from "awilix-express";
import { Router } from "express";
import container from "~/container";
import { CartController } from "~/controllers/cart.controller";
import { accessTokenValidator, platformValidator } from "~/middlewares/auth.middleware";
import { asyncHandler } from "~/utils/asyncHandler";

const router = Router();
const api = makeInvoker<CartController>(() => container.resolve('cartController'))

router
    .route("/get-my-cart")
    .get(platformValidator, accessTokenValidator, asyncHandler(api('getMyCart')));

export default router;