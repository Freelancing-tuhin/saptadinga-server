"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const appError_1 = __importDefault(require("./appError"));
/**
 * Wraps an async controller so rejected promises reach the central error
 * handler instead of every controller repeating the same try/catch.
 *
 * `fallbackMessage` is the client-facing message used when the thrown error is
 * not an {@link AppError} — it keeps the per-operation wording (and the 400
 * status) the API has always returned for unexpected failures.
 */
const asyncHandler = (handler, fallbackMessage) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch((error) => {
        if (error instanceof appError_1.default) {
            next(error);
            return;
        }
        next(new appError_1.default(400, fallbackMessage, error));
    });
};
exports.asyncHandler = asyncHandler;
exports.default = exports.asyncHandler;
