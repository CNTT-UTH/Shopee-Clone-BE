import { makeInvoker } from "awilix-express";
import { Router } from "express";
import container from "~/container";
import { AttributeController } from "~/controllers/attribute.controller";

const router = Router();
const api = makeInvoker<AttributeController>(() => container.resolve('attributeController'));

router
    .route('/get-attribute-by-cateid/:cate_id')
    .get(api('getAttributeByCateid'));

export default router;