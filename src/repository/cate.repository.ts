import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { Category } from "~/models/entity/category.entity";

export class CategoryRepository {
     private repo: Repository<Category>;

     constructor() {
          this.repo = AppDataSource.getRepository(Category);
     }

     async getAllRootCate(){
          const cates = this.repo.findBy({level: 1});
          return cates;
     }
     
     async getAllChildrenCate(parent_id: number){
          const cates = this.repo.findBy({parent_cate_id: parent_id});
          return cates;
     }

     
}