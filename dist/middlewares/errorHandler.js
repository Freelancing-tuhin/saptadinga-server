"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const config_1 = __importDefault(require("../config/config"));
const message_1 = require("../constants/message");
const logger_1 = require("../utils/logger");
/** Terminal 404 for any request that matched no route. */
const notFoundHandler = (req, res) => {
    res.status(404).json({ message: message_1.MESSAGE.none, path: req.originalUrl });
};
exports.notFoundHandler = notFoundHandler;
/**
 * Central error handler. Controllers throw; this is the only place that decides
 * a status code and serialises the failure.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error, req, res, _next) => {
    const isAppError = error instanceof appError_1.default;
    const statusCode = isAppError ? error.statusCode : 500;
    const message = isAppError ? error.message : message_1.MESSAGE.error;
    logger_1.logger.error(`${req.method} ${req.originalUrl} -> ${statusCode}`, error);
    const body = { message };
    // Underlying error text is useful locally but is never shipped to clients in
    // production, where it can leak schema and connection details.
    if (!config_1.default.isProd) {
        const cause = isAppError ? error.details : error;
        if (cause instanceof Error)
            body.error = cause.message;
        else if (typeof cause === "string")
            body.error = cause;
    }
    res.status(statusCode).json(body);
};
exports.errorHandler = errorHandler;
