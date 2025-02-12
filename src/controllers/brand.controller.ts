import { Request, Response } from "express";
import brandService from "~/services/brand.service";
class BrandController {
     async getBrands(req: Request, res: Response) {
          const result = await brandService.getBrands();

          res.send({
               success: true,
               message: null,
               result 
          })
     }
} 

export default new BrandController();