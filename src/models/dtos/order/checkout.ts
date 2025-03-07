import { OrderItem } from '~/models/entity/order.entity';
import { ShippingInfoDTO } from '../ShippingDTO';
import { OrderDTO, OrderItemDTO, PaymentDTO } from './OrderDTO';

export class CheckoutTemp {
    orders?: OrderCheckout[];
    payment_method_id?: number;
    address_id?: number;
    total_products_price?: number;
    total_ship_fee?: number;
    total_price?: number;
}

export class OrderCheckout {
    order_temp_id?: string;
    shipping_info: { [index: number]: ShippingInfoDTO };
    shipping_channel_id_selected?: number;
    notes?: string;
    items?: OrderItemDTO[];
    items_count?: number;
    shop_id?: number;
    ship_fee?: number;
    total_items_price?: number;
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
