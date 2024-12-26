import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain, FieldValidationError } from "express-validator";
import { RunnableValidationChains } from "express-validator/lib/middlewares/schema";
import { ApiError } from "./apiError";
import HTTP_STATUS from "~/constants/httpStatus";

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // sequential processing, stops running validations chain if one fails.
        await validation.run(req);

        const result = validationResult(req);

        if (!result.isEmpty()) {
            console.log(result);
            // return res.status(400).json({ errors: result.array() });
            throw new ApiError(
                "Validation failed",
                HTTP_STATUS.BAD_REQUEST,
                result.array().map((error) => {
                    return {
                        field: (error as FieldValidationError)?.path,
                        msg: (error as FieldValidationError)?.msg,
                    };
                }),
            );
        }

        return next();
    };
};
