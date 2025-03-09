import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import container from '~/container';
import { CategoryController } from '~/controllers/cate.controller';
import { asyncHandler } from '~/utils/asyncHandler';

const router = Router();
const api = makeInvoker<CategoryController>(() => container.resolve('cateController'));

router.route('/get-category-tree').get(asyncHandler(api('getCateTree')));

export default router;
