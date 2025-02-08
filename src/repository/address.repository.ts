import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { AddressDTO } from '~/models/dtos/AddressDTO';
import { Address } from '~/models/entity/address.entity';
import { Shop } from '~/models/entity/shop.entity';
import { User } from '~/models/entity/user.entity';

export class AddressRepository {
    private repo: Repository<Address>;

    constructor() {
        this.repo = AppDataSource.getRepository(Address);
    }

    async createAddressForUser(data: Partial<AddressDTO>, user: User) {
        const address = this.repo.create(data);
        address.user = user;
        await this.repo.save(address);

        return address;
    }

    async createAddressForShop(data: Partial<AddressDTO>, shop: Shop) {
        const address = this.repo.create(data);
        address.shop = shop;
        await this.repo.save(address);

        return address;
    }

    async findAddressById(id: number) {
        return await this.repo.findOneBy({ id });
    }

    async findAddressUserId(id: string) {
        return await this.repo.findBy({ user: { _id: id } });
    }
}
