import { DeliveryStatus, OrderStatus, PaymentStatus } from '~/constants/enums';
import { AddressDTO } from '../AddressDTO';
import { ShippingInfoDTO } from '../ShippingDTO';
import { CartItemDTO } from '../cart/CartDTO';

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

export class OrderItemDTO extends CartItemDTO { }

export class PaymentDTO {
    method?: number; // 0: COD, 1: VNPay
    status?: PaymentStatus; // 0: Pending, 1: Success
}

export class TrackingDeliveryOrderDTO {
    status?: DeliveryStatus;
    message?: string;
    time?: Date;
}
