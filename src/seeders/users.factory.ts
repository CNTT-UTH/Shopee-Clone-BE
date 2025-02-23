import { define, useRefreshDatabase } from 'typeorm-seeding';
import { User } from '~/models/entity/user.entity';
import { faker } from '@faker-js/faker';
import { UserVerifyStatus } from '~/constants/enums';
import { hash } from 'crypto';

define(User, () => {
    const user = new User();
    user.name = faker.person.fullName();
    user.username = faker.internet.username();
    user.email = faker.internet.email();
    user.verify = UserVerifyStatus.Verified;
    user.avatar = faker.image.avatar();
    user.password = faker.internet.password();
    return user;
});
