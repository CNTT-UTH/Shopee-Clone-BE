import { Request, Response, NextFunction } from 'express';
import { CreateProductDTO } from '~/models/dtos/product/CreateProductDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { MediaService } from '~/services/media.service';
import { ProductService } from '~/services/product.service';
import { Pagination } from '~/models/dtos/PaginationDTO';
import { Filter } from '~/models/dtos/FilterDTO';
import { BASE_FILTER_BY } from '~/constants/productFilter';

export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly mediaService: MediaService,
    ) { }

    async uploadProductImages(req: Request, res: Response) {
        const result = await this.mediaService.uploadImagesProduct(req);

        res.send({
            success: true,
            mesage: null,
            result,
        });
    }

    async createProductInfos(req: Request<ParamsDictionary, any, Partial<CreateProductDTO>>, res: Response) {
        // Lấy CreateProductDTO
        const createProductDTO: Partial<CreateProductDTO> = req.body;
        const user_id: string = req?.decoded?._id as string;

        const result = await this.productService.createProduct(createProductDTO, user_id);
        //
        res.send({
            success: true,
            mesage: null,
            result,
        });
    }

    async getProductById(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const result = await this.productService.getProduct(id);

        res.send({
            success: true,
            mesage: null,
            result,
        });
    }

    async getAllProducts(req: Request, res: Response) {
        const pagination: Pagination = {
            // offset: req?.query?.offset ? Number(req?.query?.offset) : 0,
            limit: req?.query?.limit ? Number(req?.query?.limit) : 20,
            page: req?.query?.page ? Number(req?.query?.page) : 1,
        };

        const filter: Filter = {
            by: (req?.query?.by as BASE_FILTER_BY) ?? 'price',
            order: (req?.query?.by as 'asc' | 'desc') ?? 'asc',
            price_min: req?.query?.price_min ? Number(req?.query?.price_min) : 0,
            price_max: req?.query?.price_max ? Number(req?.query?.price_min) : undefined,
        };

        const result = await this.productService.getAllProducts({ pagination, filter });
        res.send({
            success: true,
            mesage: null,
            result,
        });
    }

    async getProductsByCate(req: Request, res: Response){
        const pagination: Pagination = {
            // offset: req?.query?.offset ? Number(req?.query?.offset) : 0,
            limit: req?.query?.limit ? Number(req?.query?.limit) : 20,
            page: req?.query?.page ? Number(req?.query?.page) : 1,
        };

        const filter: Filter = {
            by: (req?.query?.by as BASE_FILTER_BY) ?? 'price',
            order: (req?.query?.by as 'asc' | 'desc') ?? 'asc',
            price_min: req?.query?.price_min ? Number(req?.query?.price_min) : 0,
            price_max: req?.query?.price_max ? Number(req?.query?.price_min) : undefined,
        };

        const cate_id:number = Number(req?.params?.cate_id);

        const result = await this.productService.getProductsByCate({ pagination, filter, cate_id });
        res.send({
            success: true,
            mesage: null,
            result,
        });
    }
}
