import { BaseEntity, Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { RegisterInfoShopDTO } from "~/models/dtos/ShopDTO";
import { Shop } from "~/models/entity/shop.entity";
import { User } from "~/models/entity/user.entity";

export class ShopRepository {
     private repo: Repository<Shop>;

     constructor() {
          this.repo = AppDataSource.getRepository(Shop);
     }

     async createShop(data: Partial<RegisterInfoShopDTO>, user: User): Promise<Shop> {
          const shop = this.repo.create({
               name: data.name,
               phone: data.phone,
               user: user
          });

          await this.repo.save(shop);

          return shop;
     }

     async getShopByUserId(id: string) {
          const shop = await this.repo.findOne({ where: { user: { _id: id } }, relations: ["user"] })

          return shop;
     }

     async getShopByShopId(id: string) {
          const shop = await this.repo.findOne({ where: { id }, relations: ["user"] })

          return shop;
     }

     async updateShopAddress(shop_id: string, address_id: number): Promise<boolean> {
          try {
               await this.repo.update({ id: shop_id }, { default_address_id: address_id });
               return true;
          }
          catch {
               return false;
          }
     }
}