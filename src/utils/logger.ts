/* eslint-disable no-console */

/**
 * Thin console wrapper so log calls have one shape across the codebase and
 * debug chatter can be silenced in production without touching call sites.
 */

import config from "../config/config";

const timestamp = (): string => new Date().toISOString();

export const logger = {
	info: (message: string, ...meta: unknown[]): void => {
		console.log(`[${timestamp()}] INFO  ${message}`, ...meta);
	},

	warn: (message: string, ...meta: unknown[]): void => {
		console.warn(`[${timestamp()}] WARN  ${message}`, ...meta);
	},

	error: (message: string, ...meta: unknown[]): void => {
		console.error(`[${timestamp()}] ERROR ${message}`, ...meta);
	},

	/** Verbose tracing — suppressed in production. */
	debug: (message: string, ...meta: unknown[]): void => {
		if (config.isProd) return;
		console.debug(`[${timestamp()}] DEBUG ${message}`, ...meta);
	}
};

export default logger;
