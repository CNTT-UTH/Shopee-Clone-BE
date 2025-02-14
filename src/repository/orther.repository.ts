import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { CreateOptionDTO, CreateVariantDTO } from "~/models/dtos/product/CreateProductDTO";
import { AttributeDTO } from "~/models/dtos/product/ProductDTO";
import { AttributeValue } from "~/models/entity/attribute.entity";
import { Image } from "~/models/entity/image.entity";
import { Product } from "~/models/entity/product.entity";
import { Option, OptionValue, ProductVariant } from "~/models/entity/variant.entiity";

export class ImageRepository {
     private repo: Repository<Image>;

     constructor() {
          this.repo = AppDataSource.getRepository(Image);
     }

     async addImagesProduct(urls: string[], product: Product) {
          const results = await Promise.all(urls.map(async (url) => {
               const image = await this.repo.create({
                    image_url: url,
                    product
               }).save();

               return image;
          }))

          return results;
     }

     async getProductImages(id: number) {
          return await this.repo.find({
               where: {
                    product: {
                         _id: id
                    }
               }
          }) ?? [];
     }
}

export class OptionValueRepository {
     private repoOption: Repository<Option>;
     private repoValue: Repository<OptionValue>;

     constructor() {
          this.repoOption = AppDataSource.getRepository(Option);
          this.repoValue = AppDataSource.getRepository(OptionValue);
     }

     async getProductOptions(product: Product) {
          return await this.repoOption.find({
               where:
               {
                    product: {
                         _id: product._id
                    }
               },
               relations: ["values"]
          }) ?? []
     }

     async getOrCreateOption(name: string, product: Product) {
          const option = await this.repoOption.findOne({
               where: {
                    product: { _id: product._id },
                    name: name
               }
          })

          if (option) return option;
          else {
               return await this.repoOption.create({
                    name,
                    product
               }).save();
          }
     }

     async getOrCreateValue(name: string, option: Option) {
          const value = await this.repoValue.findOne({
               where: {
                    option: { id: option.id },
                    value_name: name
               }
          })

          if (value) return value;
          else {
               return await this.repoValue.create({
                    value_name: name,
                    option
               }).save();
          }
     }

     async addProductOptions(data: CreateOptionDTO[], product: Product) {
          const results = await Promise.all(data.map(async (opt) => {

               const option = await this.getOrCreateOption(opt.name, product);

               const values = await Promise.all(opt.value.map(async (v) => {
                    return await this.getOrCreateValue(v, option);
               }))

               return option;
          }))

          return results;
     }

     async getOptionValue(option_name: string, value: string, product: Product) {
          return await this.repoValue.findOneBy({
               value_name: value, option: {
                    name: option_name,
                    product: {
                         _id: product._id
                    }
               }
          });
     }
}

export class VariantRepository {
     private repo: Repository<ProductVariant>;
     private readonly repoOptionValue: OptionValueRepository;

     constructor() {
          this.repo = AppDataSource.getRepository(ProductVariant);
          this.repoOptionValue = new OptionValueRepository();
     }

     async createVariants(data: CreateVariantDTO[], product: Product) {
          const results = await Promise.all(
               data.map(async (variant) => {

                    const options: OptionValue[] = await Promise.all(
                         variant.option_values.map(async (option_value) => {
                              return await this.repoOptionValue.getOptionValue(option_value.name, option_value.value, product) ?? new OptionValue();
                         })
                    );

                    return await this.repo.create({
                         name: variant.name,
                         sku: variant.sku,
                         quantity: variant.stock,
                         buyturn: 0,
                         price: (variant.price as number) * (1.0 - product.discount),
                         old_price: (variant.price as number),
                         product,
                         options
                    }).save();
               })
          );

          return results;
     }

     async getVariants(product: Product) {
          return await this.repo.find({
               where: {
                    product: {
                         _id: product._id
                    }
               },
               relations: ["options"]
          })
     }
}