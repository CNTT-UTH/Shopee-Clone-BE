import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import { Role } from '~/constants/enums';
import { envConfig } from '~/constants/env';
import { AUTH_MESSAGES, USERS_MESSAGES } from '~/constants/messages';
import { ApiError } from '~/utils/errors';
import { verifyToken } from '~/utils/jwt';
import HTTP_STATUS from '~/constants/httpStatus';
import { validate } from '~/utils/validate';
import useragent from 'useragent';
import { AuthService } from '~/services/auth.service';
import { UserRepository } from '~/repository/user.repository';
const authServices = new AuthService(new UserRepository());

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

export const authorizeRole = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req?.decoded?.role as Role;
        try {
            if (!roles.includes(role)) {
                throw new ApiError(AUTH_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const isShop = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const isShop = req?.decoded?.isShop as boolean;

        try {
            if (!isShop) {
                throw new ApiError(AUTH_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const accessTokenValidator = validate(
    checkSchema({
        Authorization: {
            in: ['headers'],
            notEmpty: {
                errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
            },
            custom: {
                options: async (value: string, { req }) => {
                    const token = value.split(' ')[1];
                    if (!token) {
                        throw AUTH_MESSAGES.TOKEN_INVALID;
                    }
                    const decoded = await verifyToken({ token, secretOrPublicKey: envConfig.JWT_SECRET_ACCESS_TOKEN });

                    const userAgent = req?.headers?.['user-agent'] as string;

                    if (userAgent !== decoded.user_agent) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    if (!decoded) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }
                    req.decoded = decoded;

                    return true;
                },
            },
        },
    }),
);

export const refreshTokenValidator = validate(
    checkSchema({
        refresh_token: {
            in: ['body'],
            notEmpty: {
                errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
            },
            custom: {
                options: async (value: string, { req }) => {
                    const token = value;
                    if (!token) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }
                    const decoded = await verifyToken({ token, secretOrPublicKey: envConfig.JWT_SECRET_REFRESH_TOKEN });

                    const userAgent = req?.headers?.['user-agent'] as string;

                    if (userAgent !== decoded.user_agent) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    if (!decoded) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    req.decoded = decoded;

                    return true;
                },
            },
        },
    }),
);

export const platformValidator = validate(
    checkSchema({
        platform: {
            in: ['query'],
            custom: {
                options: async (value: string) => {
                    if (value !== 'mobile') {
                        value = 'web';
                    }
                    return true;
                },
            },
        },
        'user-agent': {
            in: ['headers'], // Specify that we're validating the headers
            exists: {
                errorMessage: 'User-Agent header is required',
            },
            isString: {
                errorMessage: 'User-Agent must be a string',
            },
            custom: {
                options: (value: string, { req }) => {
                    if (useragent.is(value).android && req?.query?.platform !== 'mobile') {
                        throw new ApiError(AUTH_MESSAGES.INVALID_PLATFORM, HTTP_STATUS.BAD_REQUEST);
                    }

                    if (!useragent.is(value).android && req?.query?.platform === 'mobile') {
                        throw new ApiError(AUTH_MESSAGES.INVALID_PLATFORM, HTTP_STATUS.BAD_REQUEST);
                    }
                    return true;
                },
            },
        },
    }),
);

export const verifyEmailValidator = validate(
    checkSchema({
        verify_email_token: {
            in: ['body'],
            notEmpty: {
                errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
            },
            custom: {
                options: async (value: string, { req }) => {
                    const token = value;
                    if (!token) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }
                    const decoded = await verifyToken({
                        token,
                        secretOrPublicKey: envConfig.JWT_SECRET_EMAIL_VERIFY_TOKEN,
                    });

                    const userAgent = req?.headers?.['user-agent'] as string;

                    if (userAgent !== decoded.user_agent) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    if (!decoded) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    req.decoded = decoded;

                    return true;
                },
            },
        },
    }),
);

export const forgotPasswordValidator = validate(
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

                    const check = await authServices.checkEmail(value);

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

                    const check = await authServices.checkUsername(value);

                    if (!check) {
                        throw USERS_MESSAGES.USERNAME_DOES_NOT_EXIST;
                    }
                    return true;
                },
            },
        },
    }),
);

export const verifyForgotPasswordValidator = validate(
    checkSchema({
        forgot_password_token: {
            in: ['body'],
            notEmpty: {
                errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
            },
            custom: {
                options: async (value: string, { req }) => {
                    const token = value;
                    if (!token) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }
                    const decoded = await verifyToken({
                        token,
                        secretOrPublicKey: envConfig.JWT_SECRET_FORGOT_PASSWORD_TOKEN,
                    });

                    const userAgent = req?.headers?.['user-agent'] as string;

                    if (userAgent !== decoded.user_agent) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    if (!decoded) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    req.decoded = decoded;

                    return true;
                },
            },
        },
    }),
);

export const resetPasswordValidator = validate(
    checkSchema({
        forgot_password_token: {
            in: ['body'],
            notEmpty: {
                errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
            },
            custom: {
                options: async (value: string, { req }) => {
                    const token = value;
                    if (!token) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }
                    const decoded = await verifyToken({
                        token,
                        secretOrPublicKey: envConfig.JWT_SECRET_FORGOT_PASSWORD_TOKEN,
                    });

                    const userAgent = req?.headers?.['user-agent'] as string;

                    if (userAgent !== decoded.user_agent) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    if (!decoded) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    req.decoded = decoded;

                    return true;
                },
            },
        },
        password: {
            ...passwordParam,
        },
    }),
);

export const verifyPasswordValidator = validate(
    checkSchema({
        forgot_password_token: {
            in: ['body'],
            notEmpty: {
                errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
            },
            custom: {
                options: async (value: string, { req }) => {
                    const token = value;
                    if (!token) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }
                    const decoded = await verifyToken({
                        token,
                        secretOrPublicKey: envConfig.JWT_SECRET_FORGOT_PASSWORD_TOKEN,
                    });

                    const userAgent = req?.headers?.['user-agent'] as string;

                    if (userAgent !== decoded.user_agent) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    if (!decoded) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    req.decoded = decoded;

                    return true;
                },
            },
        },
        code: {
            notEmpty: true,
        },
    }),
);
