import { Router } from 'express';
import cateController from '~/controllers/cate.controller';
import { asyncHandler } from '~/utils/asyncHandler';
const router = Router();

router.route('/get-category-tree').get(asyncHandler(cateController.getCateTree));

export default router;
