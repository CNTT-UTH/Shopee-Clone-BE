import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain, FieldValidationError } from "express-validator";
import { RunnableValidationChains } from "express-validator/lib/middlewares/schema";
import { ApiError } from "./errors";
import HTTP_STATUS from "~/constants/httpStatus";

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // sequential processing, stops running validations chain if one fails.
        await validation.run(req);

        const result = validationResult(req);

        if (result.isEmpty()) {
            return next();
        }

        const objectResult = result.mapped();

        const errors: Record<string, any> = {};

        for (const key in objectResult) {
            const { msg } = objectResult[key];

            if (msg instanceof ApiError && msg?.statusCode !== 422) {
                return next(msg);
            }

            errors[key] = {
                message: msg as string,
                value: (objectResult[key] as FieldValidationError)?.value,
            };
        }

        return next(new ApiError("Validation failed", HTTP_STATUS.UNPROCESSABLE_ENTITY, errors));
    };
};
