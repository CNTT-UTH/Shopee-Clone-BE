import { NextFunction, Request, RequestHandler, Response } from 'express';

export const asyncHandler = (func: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.setTimeout(1000 * 20);
            await func(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
