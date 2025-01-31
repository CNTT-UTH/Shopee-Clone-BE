import { Router } from "express";
import shopController from "~/controllers/shop.controller";
import { accessTokenValidator } from "~/middlewares/auth.middleware";
import { validationMiddleware } from "~/middlewares/validation.middleware";
import { RegisterInfoShopDTO } from "~/models/dtos/ShopDTO";
import { asyncHandler } from "~/utils/asyncHandler";

const router = Router();

router
     .route("/register")
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
     .post(accessTokenValidator, validationMiddleware(RegisterInfoShopDTO), asyncHandler(shopController.register))

export default router;