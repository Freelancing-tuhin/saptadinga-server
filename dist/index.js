"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const db_config_1 = __importStar(require("./config/db.config"));
const logger_1 = require("./utils/logger");
/**
 * Process entry point: connect to Mongo, start listening, and shut both down
 * cleanly on signal.
 */
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_config_1.default)();
    const app = (0, app_1.default)();
    const server = app.listen(config_1.default.server.port, () => {
        logger_1.logger.info(`Server is running at http://localhost:${config_1.default.server.port}`);
    });
    const shutdown = (signal) => {
        logger_1.logger.info(`${signal} received, shutting down`);
        server.close(() => {
            void (0, db_config_1.disconnectDb)().finally(() => process.exit(0));
        });
    };
    ["SIGINT", "SIGTERM"].forEach((signal) => process.on(signal, () => shutdown(signal)));
});
bootstrap().catch((error) => {
    logger_1.logger.error("Failed to start server", error);
    process.exit(1);
});
