import { checkSchema } from "express-validator";
import HTTP_STATUS from "~/constants/httpStatus";
import { ApiError } from "~/utils/apiError";
import { validate } from "~/utils/validate";

export const loginValidator = checkSchema({});

export const registerValidator = validate(
    checkSchema({
        username: {
            isLength: {
                options: {
                    min: 8,
                    max: 24,
                },
            },
            escape: true,
            errorMessage: "Username must be between 8 and 24 characters long", 
        },
        password: {
            isStrongPassword: {
                options: {
                    minLength: 8,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    minLowercase: 1,
                },
            },
            errorMessage:
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
        },
        confirmPassword: {
            custom: {
                options: (value: string, { req }) => {
                    // console.log(req.query);
                    // console.log(value);
                    if (value !== req.body?.password) {
                        throw new ApiError("Passwords do not match", HTTP_STATUS.UNAUTHORIZED);
                    }
                    return true;
                },
            },
        },
    }),
);
