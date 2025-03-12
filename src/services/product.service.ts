import HTTP_STATUS from '~/constants/httpStatus';
import { CreateProductDTO } from '~/models/dtos/product/CreateProductDTO';
import { ShippingInfoDTO } from '~/models/dtos/ShippingDTO';
import { AttributeValue } from '~/models/entity/attribute.entity';
import { Brand } from '~/models/entity/brand.entity';
import { Image } from '~/models/entity/image.entity';
import { Product } from '~/models/entity/product.entity';
import { Shipping, ShippingProductInfo } from '~/models/entity/shipping.entity';
import { Shop } from '~/models/entity/shop.entity';
import { Option, ProductVariant } from '~/models/entity/variant.entity';
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

    async findOne({ product_id }: { product_id: number }) {
        return await this.productRepository.findOne({
            where: { _id: product_id },
            // relations: ['product_variants'],
        });
    }

    async findOneVariant({ product_id, variant_id }: { product_id: number; variant_id: number }) {
        return await this.variantRepository.findOne({
            where: {
                variant_id,
                product: {
                    _id: product_id,
                },
            },
        });
    }

    async createProduct(data: Partial<CreateProductDTO>, user_id: string) {
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
        const variants: ProductVariant[] | null = await this.variantRepository.getProductVariants(id);

        if (!product) throw new ApiError('Sản phẩm không tồn tại!', HTTP_STATUS.NOT_FOUND);
        product!.variants = variants;


        const productDTO: ProductDTO = plainToInstance(ProductDTO, product);
        return productDTO;
    }

    async getAllProducts({
        pagination,
        filter,
        cate_id,
        keyword,
    }: {
        pagination: Pagination;
        filter?: Filter;
        cate_id?: number;
        keyword?: string;
    }) {
        pagination!.total_page = Math.ceil(
            (await this.productRepository.countAll({ cate_id: cate_id, keyword: keyword })) / pagination!.limit,
        );

        pagination = {
            ...pagination!,

            cur_page: pagination!.page,
            prev_page: pagination!.page - 1 > 0 ? pagination!.page - 1 : null,
            next_page: pagination!.page + 1 <= pagination!.total_page ? pagination!.page + 1 : null,
        };

        if (pagination.cur_page && pagination.total_page && pagination.cur_page > pagination.total_page) {
            throw new ApiError('Trang tìm kiếm không tồn tài', HTTP_STATUS.NOT_FOUND);
        }

        const products = await this.productRepository.findAll({
            pagination: pagination,
            filter: filter,
            cate_id: cate_id,
            keyword: keyword,
        });

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

    async deleteProduct(id: number) {
        const product = this.productRepository.findOneBy({ _id: id });

        if (!product) {
            throw new ApiError('Product does not exist!', HTTP_STATUS.BAD_REQUEST);
        }

        await this.productRepository.delete({ _id: id });

        return;
    }

    async getStock(id: number) {
        return (await this.productRepository.findOneBy({ _id: id }))?.quantity;
    }
}
