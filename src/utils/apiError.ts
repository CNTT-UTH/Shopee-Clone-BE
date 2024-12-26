export class ApiError extends Error {
    public statusCode: number;
    public errors?: Array<any>;

    constructor(message: string, statusCode: number, errors?: Array<any>) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;

        // Maintains proper stack trace (only for V8 engines like Node.js)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
