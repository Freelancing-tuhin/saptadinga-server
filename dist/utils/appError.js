"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.badRequest = exports.AppError = void 0;
/**
 * Error carrying the HTTP status and client-facing message the error handler
 * should use. Anything thrown that is not an AppError is treated as a 500.
 */
class AppError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, AppError);
    }
}
exports.AppError = AppError;
const badRequest = (message, details) => new AppError(400, message, details);
exports.badRequest = badRequest;
const notFound = (message, details) => new AppError(404, message, details);
exports.notFound = notFound;
exports.default = AppError;
