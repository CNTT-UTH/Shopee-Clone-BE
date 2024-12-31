import { checkSchema } from "express-validator";
import HTTP_STATUS from "~/constants/httpStatus";
import { USERS_MESSAGES } from "~/constants/messages";
import usersServices from "~/services/users.service";
import { ApiError } from "~/utils/errors";
import { validate } from "~/utils/validate";

const usernameParam = {
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
} as const;

const passwordParam = {
    notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED,
    },
    isStrongPassword: {
        options: {
            minLength: 8,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1,
        },
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG,
    },
} as const;

export const loginValidator = validate(
    checkSchema({
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            escape: true,
            custom: {
                options: async (value: string, { req }) => {
                    if (req.body?.username) return true;

                    if (!value && !req.body?.username) {
                        throw USERS_MESSAGES.USERNAME_OR_EMAIL_IS_REQUIRED;
                    }

                    const check = await usersServices.checkEmail(value);

                    if (!check) {
                        throw USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT;
                    }

                    return true;
                },
            },
        },
        username: {
            escape: true,
            optional: true,
            custom: {
                options: async (value: string, { req }) => {
                    if (req.body?.email) return true;

                    if (!value && !req.body?.email) {
                        throw USERS_MESSAGES.USERNAME_OR_EMAIL_IS_REQUIRED;
                    }

                    const check = await usersServices.checkUsername(value);

                    if (!check) {
                        throw USERS_MESSAGES.USERNAME_DOES_NOT_EXIST;
                    }
                    return true;
                },
            },
        },
        password: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED,
            },
        },
    }),
);

export const registerValidator = validate(
    checkSchema({
        email: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED,
            },
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
            ...usernameParam,
        },
        password: {
            ...passwordParam,
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
