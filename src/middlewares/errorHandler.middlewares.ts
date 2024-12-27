import { Request, Response, NextFunction } from "express";
import { ApiError } from "~/utils/errors";

export const errorHandler = (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const errors = err instanceof ApiError ? err?.errors : null;
    const message = err.message || "Internal Server Error";

    console.log("access");

    res.status(statusCode).json({
        success: false,
        message,
        errors: errors,
        // ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
