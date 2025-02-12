import { DeliveryStatus, OrderStatus, PaymentStatus } from '~/constants/enums';
import { AddressDTO } from './AddressDTO';
import { ShippingInfoDTO } from './ShippingDTO';

export class OrderDTO {
    order_id?: string;

    // 0: Đã đặt, 1: Đã xác nhận phương thức thanh toán, 2: Đang vận chuyển, 3: Đã nhận hàng
    status?: OrderStatus;

    items?: OrderItemDTO[];

    total?: number;
    total_before_discount?: number;

    shop_name?: string;
    shop_url?: string;

    shipping?: ShippingInfoDTO;
    delivery_address?: AddressDTO;

    delivery_tracking?: TrackingDeliveryOrderDTO[];
}

export class OrderItemDTO {
    product_id?: string;
    product_variant_id?: string; // Nếu sản phẩm ko có biến thể thì là null
    sku?: string;
    quantity?: number;
    price?: string;
    price_before_discount?: string;
}

export class PaymentDTO {
    method?: number; // 0: COD, 1: VNPay
    status?: PaymentStatus; // 0: Pending, 1: Success
}

export class TrackingDeliveryOrderDTO {
    status?: DeliveryStatus;
    description?: string;
    time?: string; //timestamp
}
