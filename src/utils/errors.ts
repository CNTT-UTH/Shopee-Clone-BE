export class ApiError {
    public message: string;
    public statusCode: number;
    public errors?: Record<string, any>;

    constructor(message: string, statusCode: number, errors?: Record<string, any>) {
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;

        // Maintains proper stack trace (only for V8 engines like Node.js)
        // if (Error.captureStackTrace) {
        //     Error.captureStackTrace(this, this.constructor);
        // }
    }
}