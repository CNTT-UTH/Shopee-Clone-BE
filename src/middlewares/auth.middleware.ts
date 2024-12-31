import { Request, Response, NextFunction } from "express";
import { envConfig } from "~/constants/env";
import { AUTH_MESSAGES } from "~/constants/messages";
import { ApiError } from "~/utils/errors";
import { signToken, verifyToken } from "~/utils/jwt";

export async function authen(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new ApiError(AUTH_MESSAGES.TOKEN_NOT_FOUND, 401);
        }

        const decoded = verifyToken({ token, secretOrPublicKey: envConfig.JWT_ACCESS_TOKEN_EXPIRES_IN });

        if (!decoded) {
            throw new ApiError(AUTH_MESSAGES.TOKEN_INVALID, 401);
        }

        const correctToken = await signToken({
            payload: decoded,
            privateKey: envConfig.JWT_ACCESS_TOKEN_EXPIRES_IN,
        })

        next();
    } catch (error) {
        next(error);
    }
}
