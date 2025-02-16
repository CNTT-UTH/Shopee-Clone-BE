import { makeInvoker } from "awilix-express";
import { Router } from "express";
import container from "~/container";
import { BrandController } from "~/controllers/brand.controller";
import { asyncHandler } from "~/utils/asyncHandler";

const router = Router();
const api = makeInvoker<BrandController>(() => container.resolve('brandController'))

router
    .route('/get-brands')
    .get(asyncHandler(api('getBrands')));

export default router;