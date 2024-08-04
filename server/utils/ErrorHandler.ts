class ErrorHandler extends Error {
    statusCode: Number;
    customMessage:string

    constructor(message: any, statusCode: Number, customMessage: string) {
        super(message);
        this.statusCode = statusCode;
        this.customMessage = customMessage;

        Error.captureStackTrace(this, this.constructor)
    }
}

export default ErrorHandler