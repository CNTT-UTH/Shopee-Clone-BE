import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { ShippingInfoDTO } from '~/models/dtos/ShippingDTO';
import { Product } from '~/models/entity/product.entity';
import { Shipping, ShippingProductInfo } from '~/models/entity/shipping.entity';

export class ShippingRepository {
    private repo: Repository<Shipping>;
    private repoShippingProduct: Repository<ShippingProductInfo>;

    constructor() {
        this.repo = AppDataSource.getRepository(Shipping);
        this.repoShippingProduct = AppDataSource.getRepository(ShippingProductInfo);
    }

    async getAllChannels() {
        return (await this.repo.find()) ?? [];
    }

    async getChannelById(id: number) {
        return (await this.repo.findOneBy({ shipping_channel_id: id })) ?? undefined;
    }

    async getInfoByProductId(product_id: number) {
        return (
            (await this.repoShippingProduct.find({
                where: { product: { _id: product_id } },
                relations: ['shipping'],
            })) ?? undefined
        );
    }

    async updateProductShippingInfo(shipping_infos: ShippingInfoDTO[], product: Product) {
        const results = await Promise.all(
            shipping_infos.map(async (info) => {
                const shipping = info.channel_id ? await this.getChannelById(info.channel_id) : undefined;

                return await this.repoShippingProduct
                    .create({
                        product,
                        shipping,
                        fee: info.fee,
                        freeship: info.freeship,
                        estimated_delivery_days_max: info.estimated_delivery_days_max,
                        estimated_delivery_days_min: info.estimated_delivery_days_min,
                    })
                    .save();
            }),
        );

        return results;
    }

    async getShippingInfos(product: Product) {
        const results = await this.repoShippingProduct.find({
            where: {
                product: {
                    _id: product._id,
                },
            },
            relations: ['shipping'],
        });

        return results;
    }
}
