import { ApiError } from '~/utils/errors';
import { UserService } from './users.service';
import { USERS_MESSAGES } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';
import { CheckoutTemp, OrderCheckout } from '~/models/dtos/order/checkout';
import { CartService } from './cart.service';
import { Cart } from '~/models/entity/cart.entity';
import { genSession } from '~/utils/genSessionId';
import { CartDTO } from '~/models/dtos/cart/CartDTO';
import { v4 as uuidv4 } from 'uuid';
import { ShippingService } from './shipping.service';
import { ShippingInfoDTO } from '~/models/dtos/ShippingDTO';
import { plainToInstance } from 'class-transformer';

export class OrderService {
    constructor(
        private readonly userService: UserService,
        private readonly cartService: CartService,
        private readonly shippingService: ShippingService,
    ) { }

    private SessionStorage: {
        [index: string]: { data?: CheckoutTemp; exp: Date };
    } = {};

    async handleCheckout(user_id: string) {
        const user = await this.userService.getOne(user_id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USERNAME_DOES_NOT_EXIST, HTTP_STATUS.BAD_REQUEST);
        }

        const cart: CartDTO | null = await this.cartService.getSelectedItem(user_id);

        // if (!cart || cart.items.length == 0) {
        if (!cart) {
            throw new ApiError('Không sản phẩm nào được lựa chọn!!', HTTP_STATUS.BAD_REQUEST);
        }

        //* Create CheckoutTemp
        const checkoutInfo: CheckoutTemp = {
            payment_method_id: 0,
            orders: [],
            address_id: user?.addresses?.[0]?.id,
        };

        const itemStorage: {
            [index: number]: {
                order: OrderCheckout;
                items: any[];
            };
        } = {};

        cart.shops.map((s) => {
            const order: OrderCheckout = {
                order_temp_id: uuidv4(),
                shipping_channel_id_selected: 2,
                notes: '',
                shop_id: s,
            };

            checkoutInfo.orders?.push(order);

            itemStorage[s] = {
                items: [],
                order: order,
            };
        });

        cart.items.map((item) => {
            itemStorage[item.block_id]?.items.push(item);
        });

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

                const finalShippingInfo: ShippingInfoDTO = await this.shippingService.shippingInfoMerge(shippingInfos);

                itemStorage[s]!.order.shipping_info = [finalShippingInfo] as ShippingInfoDTO[];
            }),
        );

        const getSession = (): string => {
            let id: string;

            do {
                id = genSession();
            } while (this.SessionStorage[id]);

            return id;
        };

        const sessionID: string = getSession();
        this.SessionStorage[sessionID] = {
            exp: new Date(Date.now() + 1000 * 3600),
        };

        console.log(sessionID);

        return { itemStorage, checkoutInfo };
    }
}
