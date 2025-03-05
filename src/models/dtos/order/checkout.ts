import { OrderItem } from '~/models/entity/order.entity';
import { ShippingInfoDTO } from '../ShippingDTO';
import { OrderDTO, PaymentDTO } from './OrderDTO';

export class CheckoutTemp {
    orders: OrderCheckout[];
    payment_info: PaymentDTO;
    products_price: number;
    ship_fee: number;
    total_price: number;
}

export class OrderCheckout {
    order_temp_id: string;
    shipping_info: ShippingInfoDTO[];
    shipping_channel_id_selected: number;
    notes: string;
    items: OrderItem[];
    items_count: number;
    shop_id: number;
    ship_fee: number;
    total_price: number;
}

export class UpdateCheckout {
    orders: UpdateCheckoutOrder[];
    payment_method_id: number;
    address_id: number;
}

export class UpdateCheckoutOrder {
    order_temp_id: string;
    shipping_channel_id: number;
    notes: string;
}
