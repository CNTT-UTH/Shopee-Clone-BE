import { checkSchema } from 'express-validator';
import HTTP_STATUS from '~/constants/httpStatus';
import { USERS_MESSAGES } from '~/constants/messages';
import { UserRepository } from '~/repository/user.repository';
import { AuthService } from '~/services/auth.service';
import { ApiError } from '~/utils/errors';
import { validate } from '~/utils/validate';

const authServices = new AuthService(new UserRepository());

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
            in: ['body'],
            optional: true,
            isEmail: true,
            escape: true,
            custom: {
                options: async (value: string, { req }) => {
                    if (req.body?.username && !value) return true;

                    const check = await authServices.checkEmail(value);

                    if (!check) {
                        throw USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT;
                    }

                    if (!value && !req.body?.username) {
                        throw USERS_MESSAGES.USERNAME_OR_EMAIL_IS_REQUIRED;
                    }

                    return true;
                },
            },
        },
        username: {
            in: ['body'],
            optional: true,
            escape: true,
            custom: {
                options: async (value: string, { req }) => {
                    if (req.body?.email) return true;

                    if (!value && !req.body?.email) {
                        throw USERS_MESSAGES.USERNAME_OR_EMAIL_IS_REQUIRED;
                    }

                    const check = await authServices.checkUsername(value);

                    if (!check) {
                        throw USERS_MESSAGES.USERNAME_DOES_NOT_EXIST;
                    }
                    return true;
                },
            },
        },
        oneOfField: {
            custom: {
                options: (value, { req }) => {
                    if (!req.body.email && !req.body.username) {
                        throw new Error('Phải có ít nhất một trong hai trường: email hoặc username');
                    }
                    return true;
                },
            },
        },
        password: {
            in: ['body'],
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
            errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID,
            custom: {
                options: async (value: string) => {
                    const check = await authServices.checkEmail(value);
                    if (check) {
                        throw USERS_MESSAGES.EMAIL_ALREADY_EXISTS;
                    }
                    return true;
                },
            },
        },
        username: {
            ...usernameParam,
            custom: {
                options: async (value: string, { req }) => {
                    const check = await authServices.checkUsername(value);

                    if (check) {
                        throw USERS_MESSAGES.USERNAME_EXISTED;
                    }
                    return true;
                },
            },
        },
        password: {
            ...passwordParam,
        },
        confirm_password: {
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

export const updateProfileValidator = validate(
    checkSchema({
        name: {
            optional: true,
            isLength: {
                options: {
                    min: 1,
                    max: 100,
                },
                errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
            },
        },
        gender: {
            optional: true,
            custom: {
                options: async (value: number) => {
                    if (value < 0 && value > 2) throw 'Gender format is error.';
                    return true;
                },
            },
        },
        phone: {
            optional: true,
            isMobilePhone: {
                options: ['vi-VN'],
                errorMessage: USERS_MESSAGES.PHONE_NUMBER_INVALID,
            },
        },
    }),
);
