import { plainToInstance } from "class-transformer";
import HTTP_STATUS from "~/constants/httpStatus";
import { AddressDTO } from "~/models/dtos/AddressDTO";
import { RegisterInfoShopDTO, ShopDTO } from "~/models/dtos/ShopDTO";
import { UserDTO } from "~/models/dtos/UserDTO";
import { Shop } from "~/models/entity/shop.entity";
import { User } from "~/models/entity/user.entity";
import { AddressRepository } from "~/repository/address.repository";
import { ShopRepository } from "~/repository/shop.repository";
import { UserRepository } from "~/repository/user.repository";
import { ApiError } from "~/utils/errors";

class ShopService {
     private shopRepository: ShopRepository;
     private addressRepository: AddressRepository;
     private userRepository: UserRepository;

     constructor() {
          this.shopRepository = new ShopRepository();
          this.addressRepository = new AddressRepository();
          this.userRepository = new UserRepository();
     }

     async register(payload: RegisterInfoShopDTO) {

          // Lấy user
          const user = await this.userRepository.findById(payload.user_id as string);

          if (user?.is_shop) {
               throw new ApiError("Shop already registered!", HTTP_STATUS.BAD_REQUEST);
          }

          // Tạo địa chỉ
          const addressDTO: AddressDTO = plainToInstance(AddressDTO, payload.pickup_address);
          const address = await this.addressRepository.createAddress(addressDTO);


          // Tạo shop
          const shopRegisterInfoDTO: RegisterInfoShopDTO = plainToInstance(RegisterInfoShopDTO, payload)
          const shop = await this.shopRepository.createShop(shopRegisterInfoDTO, user as User);

          // Cập nhật shop address
          await this.shopRepository.updateShopAddress(shop.id, address.id);
          await this.userRepository.updateToShop(shop.user._id);

          const shopDTO: ShopDTO = plainToInstance(ShopDTO, shop);
          console.log(shopDTO);
          return shopDTO;
     }

     async getInfo(user_id: string) {
          const [shop, user] = await Promise.all([
               await this.shopRepository.getShopByUserId(user_id),
               await this.userRepository.findById(user_id),
          ]
          )

          const userDTO = plainToInstance(UserDTO, user);
          const shopDTO = plainToInstance(ShopDTO, shop);

          shopDTO.account = userDTO;

          return shopDTO;
     }
}

export default new ShopService();