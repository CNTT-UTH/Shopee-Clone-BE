import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ProductService } from '~/services/product.service';

@ValidatorConstraint({ name: 'isProductExist', async: true })
export class IsProductExist implements ValidatorConstraintInterface {
    constructor(private readonly productService: ProductService) { }

    async validate(value: { product_id: number; variant_id: number }, args: ValidationArguments) {
        return !!(await this.productService.findOne(value));
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Product does not exist!';
    }
}
