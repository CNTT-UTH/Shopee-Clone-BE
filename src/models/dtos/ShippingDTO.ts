import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ShippingInfoDTO {
    @Expose()
    @Transform(({ obj }) => obj?.shipping?.shipping_channel_id)
    channel_id?: number;

    @Expose()
    @Transform(({ obj }) => obj?.shipping?.name)
    name?: string; // Ex: Nhanh, Hỏa tốc,...

    @Expose()
    fee?: number;
    @Expose()
    freeship?: boolean; // Miễn phí vận chuyển
    unsupport?: boolean; // Không hổ trợ

    @Expose()
    estimated_delivery_days_min?: number;
    @Expose()
    estimated_delivery_days_max?: number;

    estimated_delivery_date_from?: number; // timestamp
    estimated_delivery_date_to?: number; // timestamp

    @Expose()
    @Transform(({ obj }) => {
        const options_date: Intl.DateTimeFormatOptions = {
            year: '2-digit',
            month: '2-digit',
            day: 'numeric',
        };

        const day_min: string = new Date(
            Date.now() + 1000 * 3600 * 24 * obj?.estimated_delivery_days_min,
        ).toLocaleDateString('vi-VN', options_date);

        const day_max: string = new Date(
            Date.now() + 1000 * 3600 * 24 * obj?.estimated_delivery_days_max,
        ).toLocaleDateString('vi-VN', options_date);

        return `Nhận từ ${day_min} - ${day_max}`;
    })
    delivery_text?: string; // Ex: Nhận từ 15 Th01 - 16 Th01

    is_fastest?: boolean;

    // constructor(data: Partial<ShippingDTO>) {
    //     this.channel_id = data.channel_id;
    //     this.name = data.name;
    //     this.fee = data.fee;
    //     this.freeship = data.freeship;
    //     this.unsupport = data.unsupport;
    //     this.estimated_delivery_date_from = data.estimated_delivery_date_from;
    //     this.estimated_delivery_date_to = data.estimated_delivery_date_to;
    //     this.delivery_text = data.delivery_text;
    //     this.is_fastest = data.is_fastest;
    // }
}
