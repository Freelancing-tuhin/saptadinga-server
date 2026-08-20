import { NextFunction, Request, RequestHandler, Response } from "express";
import AppError from "./appError";

/**
 * Wraps an async controller so rejected promises reach the central error
 * handler instead of every controller repeating the same try/catch.
 *
 * `fallbackMessage` is the client-facing message used when the thrown error is
 * not an {@link AppError} — it keeps the per-operation wording (and the 400
 * status) the API has always returned for unexpected failures.
 */
export const asyncHandler =
	(handler: RequestHandler, fallbackMessage: string): RequestHandler =>
	(req: Request, res: Response, next: NextFunction): void => {
		Promise.resolve(handler(req, res, next)).catch((error: unknown) => {
			if (error instanceof AppError) {
				next(error);
				return;
			}

			next(new AppError(400, fallbackMessage, error));
		});
	};

export default asyncHandler;
