import { checkSchema } from "express-validator";
import HTTP_STATUS from "~/constants/httpStatus";
import { USERS_MESSAGES } from "~/constants/messages";
import { ApiError } from "~/utils/errors";
import { validate } from "~/utils/validate";

export const loginValidator = checkSchema({});

export const registerValidator = validate(
    checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID,
        },
        username: {
            isNumeric: false,
            isLength: {
                options: {
                    min: 8,
                    max: 24,
                },
            },
            isStrongPassword: {
                options: {
                    minUppercase: 1,
                    minNumbers: 1,
                    minLowercase: 1,
                },
            },
            escape: true,
            errorMessage: USERS_MESSAGES.USERNAME_INVALID,
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
            errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG,
        },
        confirmPassword: {
            custom: {
                options: (value: string, { req }) => {
                    if (value !== req.body?.password) {
                        throw USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD;
                    }
                    return true;
                },
            },
        },
    }),
);
