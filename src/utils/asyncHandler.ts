import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler = (func: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
