import { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";
import { Role } from "~/constants/enums";
import { envConfig } from "~/constants/env";
import { AUTH_MESSAGES } from "~/constants/messages";
import { ApiError } from "~/utils/errors";
import { verifyToken } from "~/utils/jwt";
import HTTP_STATUS from "~/constants/httpStatus";
import { validate } from "~/utils/validate";
import authService from "~/services/auth.service";

export const platformValidator = validate(
    checkSchema({
        platform: {
            in: ["query"],
            custom: {
                options: async (value: string) => {
                    if (value !== "mobile") {
                        value = "web";
                    }
                    return true;
                },
            },
        },
    }),
);

export const authorizeRole = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req?.body.role;
        console.log(role);
        console.log(roles);
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

export const accessTokenValidator = validate(
    checkSchema({
        Authorization: {
            in: ["headers"],
            notEmpty: {
                errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
            },
            custom: {
                options: async (value: string, { req }) => {
                    const token = value.split(" ")[1];
                    if (!token) {
                        throw AUTH_MESSAGES.TOKEN_INVALID;
                    }
                    const decoded = await verifyToken({ token, secretOrPublicKey: envConfig.JWT_SECRET_ACCESS_TOKEN });

                    console.log(decoded);

                    if (!decoded) {
                        throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
                    }

                    req.body = { ...req.body, ...decoded };
                    return true;
                },
            },
        },
    }),
);

export const refreshTokenValidator = validate(
    checkSchema({
        refreshToken: {
            in: ["body"],
            notEmpty: {
                errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
            },
            custom: {
                options: async (value: string, { req }) => {
                    const token = value;
                    if (!token) {
                        throw AUTH_MESSAGES.TOKEN_INVALID;
                    }
                    const decoded = await verifyToken({ token, secretOrPublicKey: envConfig.JWT_SECRET_REFRESH_TOKEN });

                    console.log(decoded);

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
