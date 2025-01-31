import { BaseEntity, Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { RegisterInfoShopDTO } from "~/models/dtos/ShopDTO";
import { Shop } from "~/models/entity/shop.entity";

export class ShopRepository {
     private repo: Repository<Shop>;

     constructor() {
          this.repo = AppDataSource.getRepository(Shop);
     }

     async createShop(data: Partial<RegisterInfoShopDTO>): Promise<Shop> {
          const shop = this.repo.create({
               name: data.name,
               phone: data.phone
          });

          await this.repo.save(shop);

          return shop;
     }

     async updateShopAddress(shop_id: string, address_id: string): Promise<boolean> {
          try {
               await this.repo.update({ id: shop_id }, { default_address_id: address_id });
               return true;
          }
          catch {
               return false;
          }
     }
}