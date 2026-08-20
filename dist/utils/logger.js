"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/**
 * Thin console wrapper so log calls have one shape across the codebase and
 * debug chatter can be silenced in production without touching call sites.
 */
const config_1 = __importDefault(require("../config/config"));
const timestamp = () => new Date().toISOString();
exports.logger = {
    info: (message, ...meta) => {
        console.log(`[${timestamp()}] INFO  ${message}`, ...meta);
    },
    warn: (message, ...meta) => {
        console.warn(`[${timestamp()}] WARN  ${message}`, ...meta);
    },
    error: (message, ...meta) => {
        console.error(`[${timestamp()}] ERROR ${message}`, ...meta);
    },
    /** Verbose tracing — suppressed in production. */
    debug: (message, ...meta) => {
        if (config_1.default.isProd)
            return;
        console.debug(`[${timestamp()}] DEBUG ${message}`, ...meta);
    }
};
exports.default = exports.logger;
