import { ProductDimensionDTO } from "~/models/dtos/product/CreateProductDTO";
import { ShippingInfoDTO } from "~/models/dtos/ShippingDTO";
import { Shipping } from "~/models/entity/shipping.entity";
import { ShippingRepository } from "~/repository/shipping.repository";

const UNIT_FEE: { [index: number]: number } = {
    [1]: 100000,
    [2]: 20000,
    [3]: 17000,
    [4]: 20000,
}

const DELIVERY_DAYS: { [index: number]: number[] } = {
    [1]: [1, 2],
    [2]: [4, 5],
    [3]: [7, 10],
    [4]: [5, 6],
}

const DIMENSION_FACTOR = 139;

export class ShippingService {
    protected readonly shippingRepository: ShippingRepository;

    constructor() {
        this.shippingRepository = new ShippingRepository();
    }

    async getAllShippingChannels() {
        const result = await this.shippingRepository.getAllChannels();

        return result;
    }
}

export class ShippingRatesManagementService extends ShippingService {


    constructor() {
        super();
    }

    countingDIM(dimension: ProductDimensionDTO): number {
        if (!dimension.height || !dimension.width || !dimension.length) return 0;
        return (dimension.height * dimension.length * dimension.width) / DIMENSION_FACTOR;
    }

    async countingRates(payload: ProductDimensionDTO, shipping_channels: number[] | "all") {
        const channels: Shipping[] = await this.shippingRepository.getAllChannels();

        const shippingDTOs: ShippingInfoDTO[] = [];

        for (const channel of channels) {
            if (shipping_channels !== "all" && !shipping_channels.includes(channel.shipping_channel_id)) continue;
            const shippingDTO: ShippingInfoDTO = {};

            shippingDTO.channel_id = channel.shipping_channel_id;
            shippingDTO.name = channel.name;
            shippingDTO.fee = Math.round(((Number(payload.weight) + this.countingDIM(payload) * 0.1) * UNIT_FEE[shippingDTO.channel_id]) / 1000) * 1000;
            shippingDTO.estimated_delivery_days_min = DELIVERY_DAYS[shippingDTO.channel_id][0];
            shippingDTO.estimated_delivery_days_max = DELIVERY_DAYS[shippingDTO.channel_id][1];
            console.log(shippingDTO);
            shippingDTOs.push(shippingDTO);
        }

        return shippingDTOs;
    }
}
