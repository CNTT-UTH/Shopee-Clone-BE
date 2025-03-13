import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { AddressDTO } from '~/models/dtos/AddressDTO';
import { Address } from '~/models/entity/address.entity';
import { Shop } from '~/models/entity/shop.entity';
import { User } from '~/models/entity/user.entity';

export class AddressRepository extends Repository<Address>{

    constructor() {
        super(Address, AppDataSource.manager)
    }

    async createAddressForUser(data: Partial<AddressDTO>, user: User) {
        const address = this.create(data);
        address.user = user;
        await this.save(address);

        return address;
    }

    async createAddressForShop(data: Partial<AddressDTO>, shop: Shop) {
        const address = this.create(data);
        address.shop = shop;
        await this.save(address);

        return address;
    }

    async findAddressById(id: number) {
        return await this.findOneBy({ id });
    }

    async findAddressUserId(id: string) {
        return await this.findBy({ user: { _id: id } });
    }
}
