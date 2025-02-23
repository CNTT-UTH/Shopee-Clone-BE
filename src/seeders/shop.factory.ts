import { define, useRefreshDatabase } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { ShopVerifyStatus, UserVerifyStatus } from '~/constants/enums';
import { hash } from 'crypto';
import { Shop } from '~/models/entity/shop.entity';

define(Shop, () => {
    const shop = new Shop();
    shop.name = 'Shop';
    shop.phone = faker.phone.number({ style: 'national' });
    shop.status = ShopVerifyStatus.Verified;
    shop.avatar = faker.image.url();
    return shop;
});
