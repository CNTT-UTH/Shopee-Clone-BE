import { Request, Response, NextFunction } from 'express';
import { AddressDTO } from '~/models/dtos/AddressDTO';
import { AddressService } from '~/services/address.service';

export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    async getAddress(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const result = await this.addressService.getAddress(id);

        res.send({
            success: true,
            message: null,
            result,
        });
    }

    async getUserAddresses(req: Request, res: Response) {
        const user_id: string = req?.decoded?._id as string;
        const result = await this.addressService.getUserAddresses(user_id);

        res.send({
            success: true,
            message: null,
            result,
        });
    }

    async createUserAdress(req: Request, res: Response) {
        const user_id: string = req?.decoded?._id as string;
        const addressDTO: AddressDTO = req?.body;
        const result = await this.addressService.createUserAdress(user_id, addressDTO);

        res.send({
            success: true,
            message: null,
            result,
        });
    }

    async getAllCities(req: Request, res: Response) {
        const result = await this.addressService.getAllCities();
        res.send({
            success: true,
            message: null,
            result,
        });
    }
    async getAllDistricts(req: Request, res: Response) {
        const city_code: string = req.params.city_code;
        const result = await this.addressService.getAllDistricts(city_code);
        res.send({
            success: true,
            message: null,
            result,
        });
    }
    async getAllWards(req: Request, res: Response) {
        const district_code: string = req.params.district_code;
        const result = await this.addressService.getAllWards(district_code);
        res.send({
            success: true,
            message: null,
            result,
        });
    }
}
