import { Request, Response, NextFunction } from "express";
import cateService from "~/services/cate.service";

class CategoryController {
     async getCateTree(req: Request, res: Response) {
          const result = await cateService.getCateTree();
          
          res.send({
               success: true,
               message: null,
               result
          })
     }
}

export default new CategoryController();