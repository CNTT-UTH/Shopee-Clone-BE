import HTTP_STATUS from '~/constants/httpStatus';
import { CreateProductDTO } from '~/models/dtos/product/CreateProductDTO';
import { ShippingInfoDTO } from '~/models/dtos/ShippingDTO';
import { AttributeValue } from '~/models/entity/attribute.entity';
import { Brand } from '~/models/entity/brand.entity';
import { Image } from '~/models/entity/image.entity';
import { Product } from '~/models/entity/product.entity';
import { Shipping, ShippingProductInfo } from '~/models/entity/shipping.entity';
import { Shop } from '~/models/entity/shop.entity';
import { Option, ProductVariant } from '~/models/entity/variant.entiity';
import { AttributeRepository } from '~/repository/attribute.repository';
import { BrandRepository } from '~/repository/brand.repository';
import { ImageRepository, OptionValueRepository, VariantRepository } from '~/repository/orther.repository';
import { ProductRepository } from '~/repository/product.repository';
import { ShopRepository } from '~/repository/shop.repository';
import { ApiError } from '~/utils/errors';
import { ShippingRatesManagementService, ShippingService } from './shipping.service';
import { ShippingRepository } from '~/repository/shipping.repository';
import { AttributeDTO, OptionsDTO, PriceDTO, ProductDTO, VariantDTO } from '~/models/dtos/product/ProductDTO';
import { plainToInstance } from 'class-transformer';
import { CategoryRepository } from '~/repository/cate.repository';
import { DataSource, QueryRunner } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { CategoryService } from './cate.service';
import { range } from 'lodash';
import { Pagination } from '~/models/dtos/PaginationDTO';
import { Filter } from '~/models/dtos/FilterDTO';

export class ProductService {
    /**
     * SẼ REFACTOR LẠI SAU!!!
     */
    private readonly shopRepository: ShopRepository;
    private readonly brandRepository: BrandRepository;
    private readonly imageRepository: ImageRepository;
    private readonly optionRepository: OptionValueRepository;
    private readonly attriRepository: AttributeRepository;
    private readonly productRepository: ProductRepository;
    private readonly shippingRepository: ShippingRepository;
    private readonly variantRepository: VariantRepository;
    private readonly cateRepository: CategoryRepository;

    constructor(
        private readonly shippingRatesManagementService: ShippingRatesManagementService,
        private readonly shippingService: ShippingService,
        private readonly cateService: CategoryService,
    ) {
        this.shopRepository = new ShopRepository();
        this.brandRepository = new BrandRepository();
        this.imageRepository = new ImageRepository();
        this.optionRepository = new OptionValueRepository();
        this.attriRepository = new AttributeRepository();
        this.productRepository = new ProductRepository();
        this.shippingRepository = new ShippingRepository();
        this.variantRepository = new VariantRepository();
        this.cateRepository = new CategoryRepository();
    }

    async toDTO(product: Product): Promise<ProductDTO> {
        const productDTO: ProductDTO = plainToInstance(ProductDTO, product);

        const attributes: AttributeDTO[] =
            (await this.attriRepository?.getProductAttributes(product))?.map((att) => {
                const attribute: AttributeDTO = plainToInstance(AttributeDTO, att);
                attribute.id = att.attribute?.id;
                attribute.name = att.attribute?.name;

                return attribute;
            }) ?? [];
        productDTO.product_attributes = attributes;

        const options: OptionsDTO[] = (await this.optionRepository.getProductOptions(product))?.map((opt) => {
            const optDTO: OptionsDTO = plainToInstance(OptionsDTO, opt);
            optDTO.value = opt.values?.map((v) => v.value_name);

            return optDTO;
        });
        productDTO.options = options;

        const variants: VariantDTO[] = (await this.variantRepository.getVariants(product)).map((variant) => {
            const variantDTO = plainToInstance(VariantDTO, variant);

            return variantDTO;
        });
        productDTO.variants = variants;

        const shippings: ShippingInfoDTO[] = (await this.shippingRepository.getShippingInfos(product)).map((s) => {
            const shipping: ShippingInfoDTO = plainToInstance(ShippingInfoDTO, s);
            const dayNow = new Date();

            shipping.estimated_delivery_date_from =
                dayNow.getTime() + Number(shipping.estimated_delivery_days_min) * 24 * 60 * 60 * 1000;
            shipping.estimated_delivery_date_to =
                dayNow.getTime() + Number(shipping.estimated_delivery_days_max) * 24 * 60 * 60 * 1000;
            shipping.delivery_text = `Nhận từ ${new Date(shipping.estimated_delivery_date_from).toLocaleDateString(
                'vi-VN',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'Asia/Ho_Chi_Minh',
                },
            )} đến ${new Date(shipping.estimated_delivery_date_to).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Ho_Chi_Minh',
            })}`;

            shipping.channel_id = s.shipping.shipping_channel_id;
            shipping.name = s.shipping.name;

            return shipping;
        });
        productDTO.shipping_channel = shippings;

        const priceDTO: PriceDTO = {};
        priceDTO.price = product.price;
        priceDTO.price_before_discount = product.old_price;
        priceDTO.discount = product.discount;
        priceDTO.range_min = Math.min(
            ...variants.map((variant) => {
                return variant.price as number;
            }),
        );
        priceDTO.range_max = Math.max(
            ...variants.map((variant) => {
                return variant.price as number;
            }),
        );
        priceDTO.range_min_before_discount = Math.min(
            ...variants.map((variant) => {
                return variant.price_before_discount as number;
            }),
        );
        priceDTO.range_max_before_discount = Math.max(
            ...variants.map((variant) => {
                return variant.price_before_discount as number;
            }),
        );
        productDTO.product_price = priceDTO;

        productDTO.cate_levels = await this.cateRepository.getPathTreeFromLeafCate(product.category_id);

        return productDTO;
    }

    async createProduct(data: Partial<CreateProductDTO>, user_id: string) {
        // console.log(data);
        const shop: Shop | null = user_id ? await this.shopRepository.getShopByUserId(user_id) : null;

        if (!shop) throw new ApiError('SHOP KHÔNG TỒN TẠI', HTTP_STATUS.BAD_REQUEST);

        if (!(await this.cateService.ifExist(data.cate_id as number))) {
            throw new ApiError('DANH MỤC KHÔNG TỒN TẠI', HTTP_STATUS.BAD_REQUEST);
        }

        const categories_id = await this.cateService.getCateList(data.cate_id as number);

        const priceDetail: PriceDTO = await this.countingPrice(data);

        const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

        await queryRunner.connect();

        // Init Transaction
        await queryRunner.startTransaction();

        let product_id: number;

        try {
            // Add product
            const product: Product = await queryRunner.manager
                .withRepository(this.productRepository)
                .createProduct(data, priceDetail, shop.id);

            console.log(product);

            await queryRunner.manager
                .withRepository(this.productRepository)
                .addCategoriesProduct(categories_id, product._id);

            await queryRunner.manager
                .withRepository(this.imageRepository)
                .addImagesProduct(data.image_urls as string[], product);

            if (data.options)
                await queryRunner.manager
                    .withRepository(this.optionRepository)
                    .addProductOptions(data.options, product);

            if (data.product_attributes)
                await queryRunner.manager
                    .withRepository(this.attriRepository)
                    .addProductAttriValues(data.product_attributes, product);

            const shippingDTOs: ShippingInfoDTO[] = data.dimension
                ? await this.shippingRatesManagementService.countingRates(data.dimension, data.shipping_channels ?? [])
                : [];

            await queryRunner.manager
                .withRepository(this.shippingRepository)
                .updateProductShippingInfo(shippingDTOs, product);

            if (data.variants)
                await queryRunner.manager.withRepository(this.variantRepository).createVariants(data.variants, product);

            product_id = product._id;

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

        // await this.imageRepository.addImagesProduct(data.image_urls as string[], product);
        // if (data.options) await this.optionRepository.addProductOptions(data.options, product);
        // if (data.product_attributes) await this.attriRepository.addProductAttriValues(data.product_attributes, product);
        // await this.shippingRepository.updateProductShippingInfo(shippingDTOs, product);
        // if (data.variants) await this.variantRepository.createVariants(data.variants, product);
        // return await this.toDTO(product);

        return await this.getProduct(product_id);
    }

    async getProduct(id: number) {
        const product: Product | null = await this.productRepository.findProductById(id);

        if (!product) throw new ApiError('Sản phẩm không tồn tại!', HTTP_STATUS.NOT_FOUND);

        // return product;
        return plainToInstance(ProductDTO, product);
    }

    async getAllProducts({ pagination, filter }: { pagination: Pagination; filter?: Filter }) {
        pagination!.total_page = Math.ceil((await this.productRepository.countAll()) / pagination!.limit);

        pagination = {
            ...pagination!,

            cur_page: pagination!.page,
            prev_page: pagination!.page - 1 > 0 ? pagination!.page - 1 : null,
            next_page: pagination!.page + 1 < pagination!.total_page ? pagination!.page + 1 : null,
        };

        if (pagination.cur_page && pagination.total_page && pagination.cur_page > pagination.total_page) {
            throw new ApiError('Trang tìm kiếm không tồn tài', HTTP_STATUS.NOT_FOUND);
        }

        const products = await this.productRepository.findAll({ pagination, filter });

        const productDTOs = await Promise.all(products.map((product) => plainToInstance(ProductDTO, product)));

        return { data: productDTOs, pagination };
    }

    async countingPrice(data: Partial<CreateProductDTO>): Promise<PriceDTO> {
        const priceDTO: PriceDTO = {
            discount: Number(data.discount),
        };

        if (!data.options) {
            priceDTO.price = Number(data.price) * (1 - Number(data.discount));
            priceDTO.price_before_discount = data.price;
        } else {
            priceDTO.range_min_before_discount = data.variants
                ? Math.min(...data.variants.map((variant) => Number(variant.price)))
                : undefined;

            priceDTO.range_max_before_discount = data.variants
                ? Math.max(...data.variants.map((variant) => Number(variant.price)))
                : undefined;

            priceDTO.range_min = priceDTO.range_min_before_discount
                ? priceDTO.range_min_before_discount * (1 - Number(priceDTO.discount))
                : undefined;

            priceDTO.range_max = priceDTO.range_max_before_discount
                ? priceDTO.range_max_before_discount * (1 - Number(priceDTO.discount))
                : undefined;

            priceDTO.price = priceDTO.range_min;
            priceDTO.price_before_discount = priceDTO.range_min_before_discount;
        }

        return priceDTO;
    }
}
