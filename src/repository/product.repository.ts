import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { CreateProductDTO } from "~/models/dtos/product/CreateProductDTO";
import { AttributeValue } from "~/models/entity/attribute.entity";
import { Brand } from "~/models/entity/brand.entity";
import { CartItem } from "~/models/entity/cart.entity";
import { Image } from "~/models/entity/image.entity";
import { Product } from "~/models/entity/product.entity";
import { Shipping } from "~/models/entity/shipping.entity";
import { Shop } from "~/models/entity/shop.entity";
import { Option } from "~/models/entity/variant.entiity";

export class ProductRepository {
     private repo: Repository<Product>

     constructor() {
          this.repo = AppDataSource.getRepository(Product);
     }

     async findProductById(id: number) {
          return await this.repo.findOneBy({_id: id})
     }

     async findAll() {
          return await this.repo.find() ?? [];
     }

     async createProduct(
          data: Partial<CreateProductDTO>,
          // brand: Brand,
          // images: Image[],
          // options: Option[],
          // attributes: AttributeValue[],
          // shop: Shop,
          // shipping_channels: Shipping[]
     ) {
          const product = await this.repo.create({
               title: data.title,
               sku: data.sku,
               description: data.description,
               category_id: data.cate_id,
               quantity: data.stock,
               price: (data.price as number) * (1.0 - (data.discount ?? 0)),
               old_price: (data.price as number),
               discount: (data.discount ?? 0),
               buyturn: 0,
               weight: data.dimension?.weight ? data.dimension?.weight * 1000 : 0,
               width: data.dimension?.width,
               height: data.dimension?.height,
               length: data.dimension?.length,
               // brand,
               // images,
               // options,
               // attributes,
               // shop,
               // shipping_channels,
          }).save();

          return product;
     }

     async updateRelations(
          data: {
               brand?: Brand,
               shop?: Shop,
               shipping_channels?: Shipping[]
          }, product: Product
     ) {
          return await this.repo.merge(
               product,
               {
                    ...data
               }
          ).save();
     }
}

