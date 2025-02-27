import { define, useRefreshDatabase } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { ShopVerifyStatus, UserVerifyStatus } from '~/constants/enums';
import { hash } from 'crypto';
import { Option, OptionValue, ProductVariant } from '~/models/entity/variant.entiity';
import { Image } from '~/models/entity/image.entity';
import { Attribute } from '~/models/entity/attribute.entity';
import { ShippingProductInfo } from '~/models/entity/shipping.entity';

define(Option, () => {
    const option: Option = new Option();
    return option;
});

define(OptionValue, () => {
    const value: OptionValue = new OptionValue();
    return value;
});

define(ProductVariant, () => {
    const variant: ProductVariant = new ProductVariant();

    return variant;
});

define(Image, () => {
    const image: Image = new Image();
    return image;
});

define(ShippingProductInfo, () => {
    const info: ShippingProductInfo = new ShippingProductInfo();
    return info;
});
