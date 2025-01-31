import { plainToInstance } from "class-transformer";
import { AddressDTO } from "~/models/dtos/AddressDTO";
import { RegisterInfoShopDTO } from "~/models/dtos/ShopDTO";
import { AddressRepository } from "~/repository/address.repository";
import { ShopRepository } from "~/repository/shop.repository";

class ShopService {
     private shopRepository: ShopRepository;
     private addressRepository: AddressRepository;

     constructor() {
          this.shopRepository = new ShopRepository();
          this.addressRepository = new AddressRepository();
     }

     async register(payload: RegisterInfoShopDTO) {
          
          // Tạo địa chỉ
          const addressDTO: AddressDTO = plainToInstance(AddressDTO, payload.pickup_address);
          const address = await this.addressRepository.createAddress(addressDTO);
          
          // Tạo shop
          const shopDTO: RegisterInfoShopDTO = plainToInstance(RegisterInfoShopDTO, payload)
          const shop = await this.shopRepository.createShop(shopDTO);

          // Cập nhật shop address
          await this.shopRepository.updateShopAddress(shop.id, address.id);
          console.log(shop);
          return shop;
     }
}

export default new ShopService();