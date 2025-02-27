import { define, useRefreshDatabase } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { ShopVerifyStatus, UserVerifyStatus } from '~/constants/enums';
import { hash } from 'crypto';
import { Product } from '~/models/entity/product.entity';

define(Product, () => {
    const product = new Product();
    // product.title = faker.commerce.productName();
    product.description = faker.commerce.productDescription();
    // product.price = Number(faker.commerce.price({ min: 1000, max: 10000000 }));
    // product.discount = Number(faker.number.float({ min: 0.1, max: 0.2 }));
    // product.old_price = product.price * ()

    return product;
});
