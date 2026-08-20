import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import config from "../config/config";
import { MESSAGE } from "../constants/message";
import { logger } from "../utils/logger";

/** Terminal 404 for any request that matched no route. */
export const notFoundHandler = (req: Request, res: Response): void => {
	res.status(404).json({ message: MESSAGE.none, path: req.originalUrl });
};

/**
 * Central error handler. Controllers throw; this is the only place that decides
 * a status code and serialises the failure.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: unknown, req: Request, res: Response, _next: NextFunction): void => {
	const isAppError = error instanceof AppError;
	const statusCode = isAppError ? error.statusCode : 500;
	const message = isAppError ? error.message : MESSAGE.error;

	logger.error(`${req.method} ${req.originalUrl} -> ${statusCode}`, error);

	const body: Record<string, unknown> = { message };

	// Underlying error text is useful locally but is never shipped to clients in
	// production, where it can leak schema and connection details.
	if (!config.isProd) {
		const cause = isAppError ? error.details : error;
		if (cause instanceof Error) body.error = cause.message;
		else if (typeof cause === "string") body.error = cause;
	}

	res.status(statusCode).json(body);
};
