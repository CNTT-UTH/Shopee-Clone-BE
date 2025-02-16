import { Router } from "express";
import cartController from "~/controllers/cart.controller";
import { accessTokenValidator, platformValidator } from "~/middlewares/auth.middleware";
import { asyncHandler } from "~/utils/asyncHandler";
const router = Router();

router
     .route("/get-my-cart")
     .get(platformValidator, accessTokenValidator, asyncHandler(cartController.getMyCart));

export default router;