import { asClass, createContainer } from 'awilix';
import { UserService } from './services/users.service';
import { UserController } from './controllers/users.controller';
import { UserRepository } from './repository/user.repository';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repository/product.repository';
// import { OrderService } from './services/order.service';
// import { OrderController } from './controllers/order.controller';
// import { OrderRepository } from './repository/order.repository';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { CartRepository } from './repository/cart.repository';
import { AddressController } from './controllers/address.controller';
import { AttributeController } from './controllers/attribute.controller';
import { BrandController } from './controllers/brand.controller';
import { CategoryController } from './controllers/cate.controller';
import { ShippingController } from './controllers/shipping.controller';
import { ShopController } from './controllers/shop.controller';
import { AddressService } from './services/address.service';
import { AttributeService } from './services/attribute.service';
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/cate.service';
import { ShippingRatesManagementService, ShippingService } from './services/shipping.service';
import { ShopService } from './services/shop.service';
import { MediaService } from './services/media.service';
import { CityRepository } from './repository/city.repository';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { PaymentRepository } from './repository/payment.repository';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repository/order.repository';
import { ShippingRepository } from './repository/shipping.repository';
// import { PaymentService } from './services/payment.service';
// import { PaymentController } from './controllers/payment.controller';
// import { PaymentRepository } from './repository/payment.repository';

const container = createContainer({
    injectionMode: 'CLASSIC',
});

container.register({
    // USER MODULE:
    userRepository: asClass(UserRepository).singleton(),
    userService: asClass(UserService).singleton(),
    userController: asClass(UserController).scoped(),

    // AUTH MODULE:
    authService: asClass(AuthService).singleton(),
    authController: asClass(AuthController).scoped(),

    // PRODUCT MODULE:
    productRepository: asClass(ProductRepository).singleton(),
    productService: asClass(ProductService).singleton(),
    productController: asClass(ProductController).scoped(),

    // ORDER MODULE:
    orderRepository: asClass(OrderRepository).singleton(),
    orderService: asClass(OrderService).singleton(),
    orderController: asClass(OrderController).scoped(),

    // CART MODULE:
    cartRepository: asClass(CartRepository).singleton(),
    cartService: asClass(CartService).singleton(),
    cartController: asClass(CartController).scoped(),

    // PAYMENT MODULE:
    paymentRepository: asClass(PaymentRepository).singleton(),
    paymentService: asClass(PaymentService).singleton(),
    paymentController: asClass(PaymentController).scoped(),

    // ADDRESS MODULE:
    addressController: asClass(AddressController).scoped(),
    addressService: asClass(AddressService).singleton(),

    // ATTRIBUTE MODULE:
    attributeController: asClass(AttributeController).scoped(),
    attributeService: asClass(AttributeService).singleton(),

    // BRAND MODULE:
    brandController: asClass(BrandController).scoped(),
    brandService: asClass(BrandService).singleton(),

    // CATEGORY MODULE:
    cateController: asClass(CategoryController).scoped(),
    cateService: asClass(CategoryService).singleton(),

    // SHIPPING MODULE:
    shippingRepository: asClass(ShippingRepository).singleton(),
    shippingController: asClass(ShippingController).scoped(),
    shippingService: asClass(ShippingService).singleton(),
    shippingRatesManagementService: asClass(ShippingRatesManagementService).singleton(),

    // SHOP MODULE:
    shopController: asClass(ShopController).scoped(),
    shopService: asClass(ShopService).singleton(),

    // MEDIA MODULE:
    mediaService: asClass(MediaService).singleton(),

    cityRepository: asClass(CityRepository).singleton(),
});

export default container;
