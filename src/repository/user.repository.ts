import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { UserVerifyStatus } from '~/constants/enums';
import { UserDTO } from '~/models/dtos/UserDTO';
import { User } from '~/models/entity/user.entity';
import { UpdateProfileReqBody } from '~/models/requests/users.requests';

export class UserRepository extends Repository<User> {
    constructor() {
        super(User, AppDataSource.manager);
    }

    async createAndSave(userData: Partial<User>): Promise<User> {
        const user = this.create(userData);
        return this.save(user);
    }

    async findByEmailOrUsername(email?: string, username?: string): Promise<User | null> {
        return this.findOne({
            where: [{ email }, { username }],
        });
    }

    async findById(_id: string): Promise<User | null> {
        return this.findOne({ where: { _id }, relations: ['addresses'] });
    }

    async findAll(): Promise<User[]> {
        return this.find();
    }

    async existsByID(id: string): Promise<boolean> {
        const user = await this.findOneBy({ _id: id });
        return !!user;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const user = await this.findOneBy({ email });
        return !!user;
    }

    async existsByUsername(username: string): Promise<boolean> {
        const user = await this.findOneBy({ username });
        return !!user;
    }

    async updateRefreshToken(userID: string, refreshToken: string): Promise<void> {
        await this.update({ _id: userID }, { refresh_token: refreshToken });
    }

    async updateRefreshTokenMobile(userID: string, refreshToken: string): Promise<void> {
        await this.update({ _id: userID }, { refresh_token_mobile: refreshToken });
    }

    async updateVerify(_id: string): Promise<void> {
        await this.update({ _id }, { verify: UserVerifyStatus.Verified });
    }

    async updatePassword(_id: string, password: string): Promise<void> {
        await this.update({ _id }, { password });
    }

    async updateProfile(data: Partial<UserDTO>): Promise<void> {
        await this.update(
            { _id: data.user_id },
            {
                name: data?.name,
                dob: new Date(data?.dob ?? 0),
                gender: data?.gender,
                phone: data?.phone,
            },
        );
    }

    async updateUserAvatar(_id: string, url: string) {
        await this.update(
            { _id },
            {
                avatar: url,
            },
        );
    }

    async updateToShop(_id: string) {
        await this.update(
            { _id },
            {
                is_shop: true,
            },
        );
    }

    async updateRemoveShop(_id: string) {
        await this.update(
            { _id },
            {
                is_shop: false,
            },
        );
    }
}
