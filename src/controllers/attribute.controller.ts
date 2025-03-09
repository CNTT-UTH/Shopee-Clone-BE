import { Request, Response } from 'express';
import { AttributeService } from '~/services/attribute.service';

export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    async getAttributeByCateid(req: Request, res: Response) {
        const cate_id: number = Number(req.params.cate_id);
        const result = await this.attributeService.getAttributeByCateid(cate_id);

        res.send({
            suscess: true,
            message: null,
            result,
        });
    }
}
