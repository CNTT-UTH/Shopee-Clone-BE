import { ApiError } from '~/utils/errors';
import { UserService } from './users.service';
import { USERS_MESSAGES } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';
import { CheckoutTemp, OrderCheckout, UpdateCheckout } from '~/models/dtos/order/checkout';
import { CartService } from './cart.service';
import { Cart, CartItem } from '~/models/entity/cart.entity';
import { genSession } from '~/utils/genSessionId';
import { CartDTO } from '~/models/dtos/cart/CartDTO';
import { v4 as uuidv4 } from 'uuid';
import { ShippingService } from './shipping.service';
import { ShippingInfoDTO } from '~/models/dtos/ShippingDTO';
import { plainToInstance } from 'class-transformer';
import { PaymentService } from './payment.service';
import { AddressService } from './address.service';
import AppDataSource from '~/dbs/db';
import { QueryRunner } from 'typeorm';
import { fi } from '@faker-js/faker';
import { PaymentRepository } from '~/repository/payment.repository';
import { OrderRepository } from '~/repository/order.repository';
import { Order, OrderItem } from '~/models/entity/order.entity';
import { PaymentDetail, PaymentMethods } from '~/models/entity/payment.entity';
import { ShippingDetail } from '~/models/entity/shipping.entity';
import { ShippingRepository } from '~/repository/shipping.repository';
import { OrderStatus, PaymentStatus } from '~/constants/enums';
import { Address } from '~/models/entity/address.entity';
import { ProductVariant } from '~/models/entity/variant.entity';
import { Product } from '~/models/entity/product.entity';
import { User } from '~/models/entity/user.entity';

export class OrderService {
    constructor(
        private readonly userService: UserService,
        private readonly cartService: CartService,
        private readonly shippingService: ShippingService,
        private readonly paymentService: PaymentService,
        private readonly addressService: AddressService,
        private readonly paymentRepository: PaymentRepository,
        private readonly orderRepository: OrderRepository,
        private readonly shippingRepository: ShippingRepository,
    ) { }

    public static clearSessionStorage(user_id: string) {
        if (OrderService.SessionStorage[user_id]) {
            delete OrderService.SessionStorage[user_id];
        }
    }

    private static UserSessionStorage: {
        [index: string]: string;
    } = {};

    private static SessionStorage: {
        [index: string]: { data?: CheckoutTemp; exp: Date };
    } = {};
    private createCheckoutTemp(user: User): CheckoutTemp {
        return {
            payment_method_id: 1,
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
                ship_fee: 0,
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
                itemStorage[s]!.order.ship_fee = finalShippingInfo.fee!;
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
            } while (OrderService.SessionStorage[id]);

            return id;
        };

        const sessionID: string = getSession();
        OrderService.SessionStorage[sessionID] = {
            data: checkoutInfo,
            exp: new Date(Date.now() + 1000 * 3600),
        };

        return sessionID;
    }

    private validSession(user_id: string, sessionID: string) {
        if (!OrderService.SessionStorage[sessionID] && OrderService.UserSessionStorage[user_id] !== sessionID)
            throw new ApiError('Không tìm thấy thông tin checkout!', HTTP_STATUS.NOT_FOUND);

        if (OrderService.SessionStorage[sessionID].exp.getTime() < Date.now()) {
            delete sessionStorage[sessionID];

            throw new ApiError('Không tìm thấy thông tin checkout!', HTTP_STATUS.NOT_FOUND);
        }
    }

    public async handleCheckout(user_id: string) {
        const user = await this.userService.getOne(user_id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USERNAME_DOES_NOT_EXIST, HTTP_STATUS.BAD_REQUEST);
        }

        if (!user.addresses) {
            throw new ApiError('Nguoi dung chua co dia chi', HTTP_STATUS.BAD_REQUEST);
        }

        const cart: CartDTO | null = await this.cartService.getSelectedItem(user_id);

        if (!cart) {
            throw new ApiError('Không sản phẩm nào được lựa chọn!!', HTTP_STATUS.BAD_REQUEST);
        }

        const checkoutInfo: CheckoutTemp = this.createCheckoutTemp(user);
        const itemStorage = this.initializeItemStorage(cart);

        await this.processShippingInfo(cart, itemStorage);

        cart.shops.forEach((shop_id) => {
            checkoutInfo.orders?.push(itemStorage[shop_id].order);
        });

        this.calculateTotalPrices(checkoutInfo);

        const sessionID: string = this.createSession(checkoutInfo);
        OrderService.UserSessionStorage[user_id] = sessionID;
        OrderService.SessionStorage[sessionID] = {
            data: checkoutInfo,
            exp: new Date(Date.now() + 1000 * 3600),
        };

        return { session_checkout_id: sessionID };
    }

    public async getCheckoutInfo(user_id: string, sessionID: string) {
        this.validSession(user_id, sessionID);

        return OrderService.SessionStorage[sessionID].data;
    }

    public async updateCheckout(user_id: string, sessionID: string, updateBody: UpdateCheckout) {
        this.validSession(user_id, sessionID);

        const checkoutInfo = OrderService.SessionStorage[sessionID].data;

        if (updateBody.payment_method_id && !!(await this.paymentService.findOneMethod(updateBody.payment_method_id)))
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

        const checkoutInfo: CheckoutTemp | undefined = OrderService.SessionStorage[sessionID]!.data;
        if (!checkoutInfo) throw new ApiError('Không tìm thấy thông tin checkout!', HTTP_STATUS.NOT_FOUND);

        const order_ids: string[] = await this.createOrder(checkoutInfo, user_id);

        return {
            order_ids: order_ids,
        };
    }

    public async getOrder(order_id: string) {
        const order: Order | null = await this.orderRepository.getOrderById(order_id);

        if (!order) {
            throw new ApiError('Don hang khong ton tai', HTTP_STATUS.BAD_REQUEST);
        }

        return order;
    }

    public async getUserOrders(user_id: string) {
        const orders: Order[] | null = await this.orderRepository.getOrdersByUserId(user_id);

        return {
            orders,
        };
    }

    private async createOrder(checkoutInfo: CheckoutTemp, user_id: string) {
        const order_ids: string[] = [];

        await AppDataSource.transaction(async (transactionalEntityManager) => {
            for (const orderCheckout of checkoutInfo.orders!) {
                // TAO ORDER
                const order: Order = await transactionalEntityManager.save(Order, {
                    user: { _id: user_id },
                    shop: { id: orderCheckout.shop_id },
                    total: Number(orderCheckout.total_items_price) + Number(orderCheckout.ship_fee),
                    total_product: Number(orderCheckout.total_items_price),
                });
                order_ids.push(order.id);

                // TAO ORDER ITEM
                for (const item of orderCheckout.items!) {
                    const product: ProductVariant | Product | null = item.product_variant_id
                        ? await transactionalEntityManager.findOneBy(ProductVariant, {
                            variant_id: item.product_variant_id,
                            product: {
                                _id: item.product_id,
                            },
                        })
                        : await transactionalEntityManager.findOneBy(Product, {
                            _id: item.product_id,
                        });

                    if (!product) {
                        throw new ApiError('San pham da bi go!!', HTTP_STATUS.BAD_REQUEST);
                    }

                    if (product.quantity! < item.quantity) {
                        throw new ApiError('So luong vuot qua ton kho!!', HTTP_STATUS.BAD_REQUEST);
                    }

                    await transactionalEntityManager.save(OrderItem, {
                        order: { id: order.id },
                        product: { _id: item.product_id },
                        productvariant: { variant_id: item.product_variant_id },
                        price: item.price!,
                        totalprice: item.total_price!,
                        quantity: item.quantity,
                    });

                    // CAP NHAT TON KHO
                    await transactionalEntityManager.decrement(
                        Product,
                        { _id: product instanceof Product ? product._id : product.variant_id },
                        'quantity',
                        item.quantity,
                    );
                    await transactionalEntityManager.increment(
                        Product,
                        { _id: product instanceof Product ? product._id : product.variant_id },
                        'buyturn',
                        item.quantity,
                    );

                    if (product instanceof ProductVariant) {
                        await transactionalEntityManager.update(
                            ProductVariant,
                            { variant_id: product.variant_id },
                            {
                                quantity: product.quantity - item.quantity,
                                buyturn: product.buyturn + item.quantity,
                            },
                        );
                    }
                }

                // CHECK PHUONG THUC THANH TOAN
                if (
                    !(await transactionalEntityManager.findOne(PaymentMethods, {
                        where: {
                            id: checkoutInfo.payment_method_id,
                        },
                    }))
                ) {
                    throw new ApiError('Phuong thuc thanh toan khong ton tai!!', HTTP_STATUS.BAD_REQUEST);
                }

                // TAO THONG TIN PAYMENT
                const payment: PaymentDetail = await transactionalEntityManager.save(PaymentDetail, {
                    amount: order.total,
                    type: {
                        id: checkoutInfo.payment_method_id ?? 1, // Mac dinh la COD
                    },
                    order: { id: order.id },
                });

                // CHECK ADDRESS
                if (
                    !(await transactionalEntityManager.findOne(Address, {
                        where: {
                            id: checkoutInfo.address_id,
                            user: {
                                _id: user_id,
                            },
                        },
                    }))
                ) {
                    throw new ApiError('Dia chi khong ton tai!!', HTTP_STATUS.BAD_REQUEST);
                }

                // TAO THONG TIN GIAO HANG
                const shipping_detail: ShippingDetail = await transactionalEntityManager.save(ShippingDetail, {
                    shipping_channel: { shipping_channel_id: orderCheckout!.shipping_channel_id_selected },
                    order: { id: order.id },
                    fee: orderCheckout.ship_fee,
                    address: { id: checkoutInfo.address_id },
                    note_for_shipper: orderCheckout.notes ?? '',
                    estimated_delivery_date_from: new Date(Date.now() + 1000 * 3600 * 24 * 4),
                    estimated_delivery_date_to: new Date(Date.now() + 1000 * 3600 * 24 * 5),
                });

                // CAP NHAT ORDER
                await transactionalEntityManager.update(
                    Order,
                    { id: order.id },
                    { payment: payment, shipping: shipping_detail },
                );

                // if payment method is COD ==> change status to success
                if (payment.type.id === 1) {
                    await transactionalEntityManager.update(
                        PaymentDetail,
                        { id: payment.id },
                        {
                            status: PaymentStatus.Success,
                        },
                    );

                    await transactionalEntityManager.update(
                        Order,
                        { id: order.id },
                        { status: OrderStatus.Payment_Confirmed },
                    );
                } else {
                    await transactionalEntityManager.update(Order, { id: order.id }, { status: OrderStatus.Ordered });
                }
            }

            // CLEAR CART
            const cart: Cart | null = await transactionalEntityManager.findOneBy(Cart, {
                user: {
                    _id: user_id,
                },
            });
            if (cart) {
                await transactionalEntityManager.delete(CartItem, {
                    cart: cart.id!,
                    selected_to_checkout: true,
                });
            }
        });

        return order_ids;
    }
}
