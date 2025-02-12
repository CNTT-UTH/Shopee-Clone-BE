import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { Shipping } from "~/models/entity/shipping.entity";

export class ShippingRepository {
     private repo: Repository<Shipping>;

     constructor () {
          this.repo = AppDataSource.getRepository(Shipping);
     }

     async getAllChannels(){
          return await this.repo.find() ?? [];
     }
}