import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { Address } from "~/models/entity/address.entity";

export class AddressRepository {
    private repo: Repository<Address>;

    constructor() {
        this.repo = AppDataSource.getRepository(Address);
    }

    async findAddressById(id: string) {
        return await this.repo.findOneBy({ id });
    }
}
