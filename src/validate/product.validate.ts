import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'validVariants', async: false })
export class ValidVariants implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        return false;
    }
}
