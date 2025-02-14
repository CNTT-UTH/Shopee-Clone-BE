import HTTP_STATUS from "~/constants/httpStatus";
import { CreateProductDTO } from "~/models/dtos/product/CreateProductDTO";
import { ShippingInfoDTO } from "~/models/dtos/ShippingDTO";
import { AttributeValue } from "~/models/entity/attribute.entity";
import { Brand } from "~/models/entity/brand.entity";
import { Image } from "~/models/entity/image.entity";
import { Product } from "~/models/entity/product.entity";
import { ShippingProductInfo } from "~/models/entity/shipping.entity";
import { Shop } from "~/models/entity/shop.entity";
import { Option, ProductVariant } from "~/models/entity/variant.entiity";
import { AttributeRepository } from "~/repository/attribute.repository";
import { BrandRepository } from "~/repository/brand.repository";
import { ImageRepository, OptionValueRepository, VariantRepository } from "~/repository/orther.repository";
import { ProductRepository } from "~/repository/product.repository";
import { ShopRepository } from "~/repository/shop.repository";
import { ApiError } from "~/utils/errors";
import { shippingRatesManagementService } from './shipping.service';
import { ShippingRepository } from "~/repository/shipping.repository";
import { AttributeDTO, OptionsDTO, PriceDTO, ProductDTO, VariantDTO } from "~/models/dtos/product/ProductDTO";
import { plainToInstance } from "class-transformer";
import { CategoryRepository } from "~/repository/cate.repository";

class ProductService {
     private readonly shopRepository: ShopRepository;
     private readonly brandRepository: BrandRepository;
     private readonly imageRepository: ImageRepository;
     private readonly optionRepository: OptionValueRepository;
     private readonly attriRepository: AttributeRepository;
     private readonly productRepository: ProductRepository;
     private readonly shippingRepository: ShippingRepository;
     private readonly variantRepository: VariantRepository;
     private readonly cateRepository: CategoryRepository;

     constructor() {
          this.shopRepository = new ShopRepository();
          this.brandRepository = new BrandRepository();
          this.imageRepository = new ImageRepository();
          this.optionRepository = new OptionValueRepository();
          this.attriRepository = new AttributeRepository();
          this.productRepository = new ProductRepository();
          this.shippingRepository = new ShippingRepository();
          this.variantRepository = new VariantRepository();
          this.cateRepository = new CategoryRepository();

     }

     async toDTO(product: Product): Promise<ProductDTO> {
          const productDTO: ProductDTO = plainToInstance(ProductDTO, product);

          const images: string[] = (await this.imageRepository.getProductImages(product._id))?.map((image) => image.image_url);
          productDTO.image_urls = images;

          const attributes: AttributeDTO[] = (await this.attriRepository?.getProductAttributes(product))?.map((att) => {
               const attribute: AttributeDTO = plainToInstance(AttributeDTO, att);
               attribute.id = att.attribute?.id;
               attribute.name = att.attribute?.name;

               return attribute;
          }) ?? [];
          productDTO.product_attributes = attributes;

          const options: OptionsDTO[] = (await this.optionRepository.getProductOptions(product))?.map((opt) => {
               const optDTO: OptionsDTO = plainToInstance(OptionsDTO, opt);
               optDTO.value = opt.values?.map((v) => v.value_name);

               return optDTO;
          });
          productDTO.options = options;

          const variants: VariantDTO[] = (await this.variantRepository.getVariants(product)).map((variant) => {
               const variantDTO = plainToInstance(VariantDTO, variant);

               return variantDTO;
          })
          productDTO.variants = variants;

          const shippings: ShippingInfoDTO[] = (await this.shippingRepository.getShippingInfos(product)).map((s) => {
               const shipping: ShippingInfoDTO = plainToInstance(ShippingInfoDTO, s);
               const dayNow = new Date();

               shipping.estimated_delivery_date_from = dayNow.getTime() + Number(shipping.estimated_delivery_days_min) * 24 * 60 * 60 * 1000;
               shipping.estimated_delivery_date_to = dayNow.getTime() + Number(shipping.estimated_delivery_days_max) * 24 * 60 * 60 * 1000;
               shipping.delivery_text = `Nhận từ ${new Date(shipping.estimated_delivery_date_from).toLocaleDateString("vi-VN", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'Asia/Ho_Chi_Minh',
               })} đến ${new Date(shipping.estimated_delivery_date_to).toLocaleDateString("vi-VN", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'Asia/Ho_Chi_Minh',
               })}`

               shipping.channel_id = s.shipping.shipping_channel_id;
               shipping.name = s.shipping.name;

               return shipping;
          })
          productDTO.shipping_channel = shippings;

          const priceDTO: PriceDTO = {}
          priceDTO.price = product.price;
          priceDTO.price_before_discount = product.old_price
          priceDTO.discount = product.discount;
          priceDTO.range_min = Math.min(...variants.map((variant) => { return variant.price as number }))
          priceDTO.range_max = Math.max(...variants.map((variant) => { return variant.price as number }))
          priceDTO.range_min_before_discount = Math.min(...variants.map((variant) => { return variant.price_before_discount as number }))
          priceDTO.range_max_before_discount = Math.max(...variants.map((variant) => { return variant.price_before_discount as number }))
          productDTO.product_price = priceDTO;

          productDTO.cate_levels = await this.cateRepository.getPathTreeFromLeafCate(product.category_id)

          return productDTO;
     }

     async createProduct(data: Partial<CreateProductDTO>, user_id: string) {
          //Validation more...
          // {
          //      const option_name: string[] = data.options?.map((o) => o.name) ?? [];
          //      for (let variant of data.variants ?? []) {

          //           if (option_name.includes(variant.option_values))
          //      }
          // }

          const shop: Shop | null = user_id ? await this.shopRepository.getShopByUserId(user_id) : null;

          if (!shop) {
               throw new ApiError("SHOP KHÔNG TỒN TẠI", HTTP_STATUS.BAD_REQUEST);
          }

          let product: Product = await this.productRepository.createProduct(data);

          const images: Image[] = await this.imageRepository.addImagesProduct(data.image_urls as string[], product);
          const options: Option[] = data.options ? await this.optionRepository.addProductOptions(data.options, product) : [];
          const attributes: AttributeValue[] = data.product_attributes ? await this.attriRepository.addProductAttriValues(data.product_attributes, product) : [];
          const shippingDTOs: ShippingInfoDTO[] = data.dimension ? await shippingRatesManagementService.countingRates(data.dimension, data.shipping_channels ?? []) : [];
          const shipping_infos: ShippingProductInfo[] = await this.shippingRepository.updateProductShippingInfo(shippingDTOs, product);
          const variants: ProductVariant[] = data.variants ? await this.variantRepository.createVariants(data.variants, product) : [];


          product = await this.productRepository.updateRelations({ shop }, product);

          // const brand: Brand = this.brandRepository.getBrandById();
          return await this.toDTO(product);
     }

     async getProduct(id: number) {

          const product: Product | null = await this.productRepository.findProductById(id);

          if (!product) throw new ApiError("Sản phẩm không tồn tại!", HTTP_STATUS.NOT_FOUND);

          return await this.toDTO(product);

     }

     async getAllProducts() {
          const products = await this.productRepository.findAll();

          const productDTOs = await Promise.all(products.map(async (product) => await this.toDTO(product)));

          return productDTOs;
     }
}

export default new ProductService();