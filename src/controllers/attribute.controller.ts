import { Request, Response } from "express";
import attributeService from "~/services/attribute.service";

class AttributeController {
     async getAttributeByCateid(req: Request, res: Response) {
          const cate_id: number = Number(req.params.cate_id);
          const result = await attributeService.getAttributeByCateid(cate_id);

          res.send({
               suscess: true,
               message: null,
               result,
          });
     }
}

export default new AttributeController();