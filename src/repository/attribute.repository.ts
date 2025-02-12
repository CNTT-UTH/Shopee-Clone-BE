import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { Attribute } from "~/models/entity/attribute.entity";

export class AttributeRepository {
     private repo: Repository<Attribute>;

     constructor() {
          this.repo = AppDataSource.getRepository(Attribute);
     }

     async getAttriByCateid(cate_id: number) {
          const result = await this.repo.findBy({ cates: { cate_id: cate_id } })
          return result;
     }
}