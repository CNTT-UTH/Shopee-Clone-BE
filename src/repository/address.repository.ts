import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { AddressDTO } from "~/models/dtos/AddressDTO";
import { Address } from "~/models/entity/address.entity";

export class AddressRepository {
    private repo: Repository<Address>;

    constructor() {
        this.repo = AppDataSource.getRepository(Address);
    }

    async createAddress(data: Partial<AddressDTO>) {
        const address = this.repo.create(data)
        await this.repo.save(address);

        return address;
        
    }
    async findAddressById(id: string) {
        return await this.repo.findOneBy({ id });
    }
}
