import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { ShippingInfoDTO } from '~/models/dtos/ShippingDTO';
import { Product } from '~/models/entity/product.entity';
import { Shipping, ShippingDetail, ShippingProductInfo } from '~/models/entity/shipping.entity';

export class ShippingRepository extends Repository<Shipping> {
    private repoShippingProduct: Repository<ShippingProductInfo>;
    private repoShippingDetail: Repository<ShippingDetail>;

    constructor() {
        super(Shipping, AppDataSource.manager);

        this.repoShippingProduct = AppDataSource.getRepository(ShippingProductInfo);
        this.repoShippingDetail = AppDataSource.getRepository(ShippingDetail);
    }

    async getAllChannels() {
        return (await this.find()) ?? [];
    }

    async getChannelById(id: number) {
        return (await this.findOneBy({ shipping_channel_id: id })) ?? undefined;
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

    async getShippingInfos(product_id: number) {
        const results = await this.repoShippingProduct.find({
            where: {
                product: {
                    _id: product_id,
                },
            },
            relations: ['shipping'],
        });

        return results;
    }

    async createShippingDetail({
        shipping_channel_id,
        order_id,
        fee,
        address_id,
        note_for_shipper,
        estimated_delivery_date_from,
        estimated_delivery_date_to,
    }: {
        shipping_channel_id: number;
        order_id: string;
        fee: number;
        address_id: number;
        note_for_shipper: string;
        estimated_delivery_date_from?: Date;
        estimated_delivery_date_to?: Date;
    }) {
        return await this.repoShippingDetail
            .create({
                shipping_channel: {
                    shipping_channel_id,
                },
                order: {
                    id: order_id,
                },
                fee,
                address: {
                    id: address_id,
                },
                note_for_shipper
            })
            .save();
    }
}
