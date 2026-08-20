"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const routes_index_1 = __importDefault(require("./api/v1/routers/routes.index"));
const errorHandler_1 = require("./middlewares/errorHandler");
/**
 * Builds the Express application: middleware, routes, then the error handlers.
 * Kept free of side effects (no DB connect, no listen) so it can be imported
 * and exercised on its own.
 */
const createApp = () => {
    const app = (0, express_1.default)();
    const corsOptions = {
        allowedHeaders: ["sessionId", "Content-Type"],
        exposedHeaders: ["sessionId"],
        origin: config_1.default.server.corsOrigins,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json());
    app.get("/", (_req, res) => {
        res.send("<h1>air bnb server running succesfully</h1>");
    });
    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "ok", env: config_1.default.env, uptime: process.uptime() });
    });
    app.use("/api/v1", routes_index_1.default);
    // Must stay last: anything unmatched 404s, and everything thrown above
    // lands in the single error handler.
    app.use(errorHandler_1.notFoundHandler);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
exports.default = exports.createApp;
