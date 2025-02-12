import { Router } from "express";
import attributeController from "~/controllers/attribute.controller";

const router = Router();

router
     .route('/get-attribute-by-cateid/:cate_id')
     .get(attributeController.getAttributeByCateid);

export default router;