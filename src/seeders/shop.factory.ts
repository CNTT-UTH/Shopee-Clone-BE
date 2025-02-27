import { define, useRefreshDatabase } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { ShopVerifyStatus, UserVerifyStatus } from '~/constants/enums';
import { hash } from 'crypto';
import { Shop } from '~/models/entity/shop.entity';

define(Shop, () => {
    const shop = new Shop();
    shop.phone = faker.phone.number({ style: 'national' });
    shop.status = ShopVerifyStatus.Verified;
    shop.avatar = faker.image.url();
    shop.last_time_active = faker.date.recent({ days: 20 });

    return shop;
});
