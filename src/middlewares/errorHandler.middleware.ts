import { Request, Response, NextFunction } from 'express';
import { ApiError } from '~/utils/errors';
import { TypeORMError } from 'typeorm';
import { ERROR_MESSAGES } from '~/constants/messages';

export const errorHandler = (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const errors = err instanceof ApiError ? err?.errors : null;
    const details = err instanceof ApiError ? err?.details : null;
    const message =
        err instanceof ApiError
            ? err.message
            : err instanceof TypeORMError
                ? ERROR_MESSAGES.DATABASE_ERROR
                : 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        errors: errors,
        details: details,
        // ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
