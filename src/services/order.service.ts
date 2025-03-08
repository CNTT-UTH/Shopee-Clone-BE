import { ApiError } from '~/utils/errors';
import { UserService } from './users.service';
import { USERS_MESSAGES } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';
import { CheckoutTemp, OrderCheckout, UpdateCheckout } from '~/models/dtos/order/checkout';
import { CartService } from './cart.service';
import { Cart } from '~/models/entity/cart.entity';
import { genSession } from '~/utils/genSessionId';
import { CartDTO } from '~/models/dtos/cart/CartDTO';
import { v4 as uuidv4 } from 'uuid';
import { ShippingService } from './shipping.service';
import { ShippingInfoDTO } from '~/models/dtos/ShippingDTO';
import { plainToInstance } from 'class-transformer';
import { PaymentService } from './payment.service';
import { AddressService } from './address.service';

export class OrderService {
    constructor(
        private readonly userService: UserService,
        private readonly cartService: CartService,
        private readonly shippingService: ShippingService,
        private readonly paymentService: PaymentService,
        private readonly addressService: AddressService,
    ) {}

    private UserSessionStorage: {
        [index: string]: string;
    } = {};

    private SessionStorage: {
        [index: string]: { data?: CheckoutTemp; exp: Date };
    } = {};
    private createCheckoutTemp(user: any): CheckoutTemp {
        return {
            payment_method_id: 0,
            orders: [],
            address_id: user?.addresses?.[0]?.id,
        };
    }

    private initializeItemStorage(cart: CartDTO): { [index: number]: { order: OrderCheckout; items: any[] } } {
        const itemStorage: { [index: number]: { order: OrderCheckout; items: any[] } } = {};

        cart.shops.map((s) => {
            const order: OrderCheckout = {
                order_temp_id: uuidv4(),
                shipping_info: {},
                shipping_channel_id_selected: 2,
                notes: '',
                shop_id: s,
            };

            itemStorage[s] = {
                items: [],
                order: order,
            };
        });

        cart.items.map((item) => {
            itemStorage[item.block_id]?.items.push(item);
        });

        return itemStorage;
    }

    private async processShippingInfo(
        cart: CartDTO,
        itemStorage: { [index: number]: { order: OrderCheckout; items: any[] } },
    ) {
        await Promise.all(
            cart.shops.map(async (s) => {
                const shippingInfos: ShippingInfoDTO[] = await Promise.all(
                    itemStorage[s].items?.map(async (item) => {
                        const infos = await this.shippingService.getProductShippingInfo(item.product_id);

                        for (const info of infos) {
                            if (info.shipping.shipping_channel_id === 2) return plainToInstance(ShippingInfoDTO, info);
                        }

                        return plainToInstance(ShippingInfoDTO, {});
                    }),
                );

                let total_items_price = 0;
                itemStorage[s].items?.map((item) => (total_items_price += item.total_price));

                const finalShippingInfo: ShippingInfoDTO = await this.shippingService.shippingInfoMerge(shippingInfos);

                itemStorage[s]!.order.shipping_info[finalShippingInfo?.channel_id as number] = finalShippingInfo;
                itemStorage[s]!.order.items = itemStorage[s]!.items;
                itemStorage[s]!.order.items_count = itemStorage[s]!.items.length;
                itemStorage[s]!.order.ship_fee = finalShippingInfo.fee;
                itemStorage[s]!.order.total_items_price = total_items_price;
            }),
        );
    }

    private calculateTotalPrices(checkoutInfo: CheckoutTemp) {
        let total_products_price = 0,
            total_ship_fee = 0;

        checkoutInfo.orders?.map((order) => {
            total_products_price += order.total_items_price as number;
            total_ship_fee += order.ship_fee as number;
        });

        checkoutInfo.total_products_price = total_products_price;
        checkoutInfo.total_ship_fee = total_ship_fee;
        checkoutInfo.total_price = total_products_price + total_ship_fee;
    }

    private createSession(checkoutInfo: CheckoutTemp): string {
        const getSession = (): string => {
            let id: string;

            do {
                id = genSession();
            } while (this.SessionStorage[id]);

            return id;
        };

        const sessionID: string = getSession();
        this.SessionStorage[sessionID] = {
            data: checkoutInfo,
            exp: new Date(Date.now() + 1000 * 3600),
        };

        return sessionID;
    }

    private validSession(user_id: string, sessionID: string) {
        if (!this.SessionStorage[sessionID] && this.UserSessionStorage[user_id] !== sessionID)
            throw new ApiError('Không tìm thấy thông tin checkout!', HTTP_STATUS.NOT_FOUND);

        if (this.SessionStorage[sessionID].exp.getTime() < Date.now()) {

            delete sessionStorage[sessionID];

            throw new ApiError('Không tìm thấy thông tin checkout!', HTTP_STATUS.NOT_FOUND);
        }
    }

    public async handleCheckout(user_id: string) {
        const user = await this.userService.getOne(user_id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USERNAME_DOES_NOT_EXIST, HTTP_STATUS.BAD_REQUEST);
        }

        const cart: CartDTO | null = await this.cartService.getSelectedItem(user_id);

        if (!cart) {
            throw new ApiError('Không sản phẩm nào được lựa chọn!!', HTTP_STATUS.BAD_REQUEST);
        }

        const checkoutInfo: CheckoutTemp = this.createCheckoutTemp(user);
        const itemStorage = this.initializeItemStorage(cart);

        await this.processShippingInfo(cart, itemStorage);

        this.calculateTotalPrices(checkoutInfo);

        const sessionID: string = this.createSession(checkoutInfo);
        this.UserSessionStorage[user_id] = sessionID;

        return { session_checkout_id: sessionID };
    }

    public async getCheckoutInfo(user_id: string, sessionID: string) {
        this.validSession(user_id, sessionID);

        return this.SessionStorage[sessionID].data;
    }

    public async updateCheckout(user_id: string, sessionID: string, updateBody: UpdateCheckout) {
        this.validSession(user_id, sessionID);

        const checkoutInfo = this.SessionStorage[sessionID].data;

        if (updateBody.payment_method_id && !(await this.paymentService.findOneMethod(updateBody.payment_method_id)))
            checkoutInfo!.payment_method_id = updateBody.payment_method_id;

        if (updateBody.address_id && !(await this.addressService.getAddress(updateBody.address_id)))
            checkoutInfo!.address_id = updateBody.address_id;

        updateBody.orders.map((order) => {
            for (const old_order of checkoutInfo!.orders as OrderCheckout[]) {
                if (old_order.order_temp_id !== order.order_temp_id) continue;

                if (order.shipping_channel_id && old_order.shipping_info[order.shipping_channel_id])
                    old_order.shipping_channel_id_selected = order.shipping_channel_id;
                if (order.notes) old_order.notes = order.notes;
            }
        });

        return { session_checkout_id: sessionID };
    }

    public async placeOrder(user_id: string, sessionID: string) {
        this.validSession(user_id, sessionID);

        const checkoutInfo: CheckoutTemp | undefined = this.SessionStorage[sessionID].data;

        
    }

    private async createOrder(checkoutInfo: CheckoutTemp) {

    }
}
