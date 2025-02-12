import { Router } from "express";
import brandController from "~/controllers/brand.controller";
import { asyncHandler } from "~/utils/asyncHandler";

const router = Router();

router
     .route('/get-brands')
     .get(asyncHandler(brandController.getBrands));

export default router;