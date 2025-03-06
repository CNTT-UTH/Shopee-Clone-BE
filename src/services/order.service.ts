import { ApiError } from '~/utils/errors';
import { UserService } from './users.service';
import { USERS_MESSAGES } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';
import { CheckoutTemp } from '~/models/dtos/order/checkout';
import { CartService } from './cart.service';
import { Cart } from '~/models/entity/cart.entity';
import { genSession } from '~/utils/genSessionId';
import { CartDTO } from '~/models/dtos/cart/CartDTO';
import {v4 as uuidv4} from 'uuid';

export class OrderService {
    constructor(
        private readonly userService: UserService,
        private readonly cartService: CartService,
    ) { }

    private SessionStorage: {
        [index: string]: { data?: CheckoutTemp; exp: Date };
    } = {};

    async handleCheckout(user_id: string) {
        const user = await this.userService.getOne(user_id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USERNAME_DOES_NOT_EXIST, HTTP_STATUS.BAD_REQUEST);
        }

        const cart: CartDTO[] | null = await this.cartService.getSelectedItem(user_id);

        if (!cart || cart.length == 0) {
            throw new ApiError('Không sản phẩm nào được lựa chọn!!', HTTP_STATUS.BAD_REQUEST);
        }

        //* Create CheckoutTemp
        const checkoutInfo: CheckoutTemp = {
            payment_id: 0,
        };

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

        return { cart };
    }
}
