import { checkSchema } from "express-validator";
import HTTP_STATUS from "~/constants/httpStatus";
import { USERS_MESSAGES } from "~/constants/messages";
import usersServices from "~/services/users.services";
import { ApiError } from "~/utils/errors";
import { validate } from "~/utils/validate";

export const loginValidator = checkSchema({});

export const registerValidator = validate(
    checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID,
            custom: {
                options: async (value: string) => {
                    const check = await usersServices.checkEmail(value);
                    if (check) {
                        throw USERS_MESSAGES.EMAIL_ALREADY_EXISTS;
                    }
                    return true;
                },
            },
        },
        username: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.USERNAME_IS_REQUIRED,
            },
            isAlphanumeric: {
                errorMessage: USERS_MESSAGES.USERNAME_FORMAT_INVALID,
            },
            isLength: {
                options: {
                    min: 8,
                    max: 24,
                },
                errorMessage: USERS_MESSAGES.USERNAME_LENGTH_INVALID,
            },
            escape: true,
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
