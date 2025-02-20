import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { CreateProductDTO } from '~/models/dtos/product/CreateProductDTO';
import { PriceDTO } from '~/models/dtos/product/ProductDTO';
import { AttributeValue } from '~/models/entity/attribute.entity';
import { Brand } from '~/models/entity/brand.entity';
import { CartItem } from '~/models/entity/cart.entity';
import { Image } from '~/models/entity/image.entity';
import { Product } from '~/models/entity/product.entity';
import { Shipping } from '~/models/entity/shipping.entity';
import { Shop } from '~/models/entity/shop.entity';
import { Option } from '~/models/entity/variant.entiity';

export class ProductRepository extends Repository<Product> {
    constructor() {
        super(Product, AppDataSource.manager);
        // this.repo = AppDataSource.getRepository(Product);
    }

    async findProductById(id: number) {
        return await this.findOne({
            where: { _id: id },
            relations: ['shop', 'shipping_channels', 'images', 'options', 'attributes', 'variants'],
        });
    }

    async findAll() {
        return (await this.find()) ?? [];
    }

    async createProduct(
        data: Partial<CreateProductDTO>,
        price_detail: PriceDTO,
        shop_id?: string,
        // brand: Brand,
        // images: Image[],
        // options: Option[],
        // attributes: AttributeValue[],
        // shop: Shop,
        // shipping_channels: Shipping[]
    ) {
        const product = await this.create({
            title: data.title,
            sku: data.sku,
            description: data.description,
            category_id: data.cate_id,
            quantity: data.stock,
            price: price_detail.price,
            old_price: price_detail.price_before_discount,
            price_range_min: price_detail.range_min,
            price_range_max: price_detail.range_max,
            price_range_min_old: price_detail.range_min_before_discount,
            price_range_max_old: price_detail.range_max_before_discount,
            discount: price_detail.discount,
            buyturn: 0,
            weight: data.dimension?.weight ? data.dimension?.weight * 1000 : 0,
            width: data.dimension?.width,
            height: data.dimension?.height,
            length: data.dimension?.length,
            shop: {
                id: shop_id,
            },
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
            brand?: Brand;
            shop?: Shop;
            shipping_channels?: Shipping[];
        },
        product: Product,
    ) {
        return await this.merge(product, {
            ...data,
        }).save();
    }
}
