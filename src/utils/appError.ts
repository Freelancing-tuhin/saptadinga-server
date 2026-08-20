/**
 * Error carrying the HTTP status and client-facing message the error handler
 * should use. Anything thrown that is not an AppError is treated as a 500.
 */
export class AppError extends Error {
	public readonly statusCode: number;

	public readonly details?: unknown;

	constructor(statusCode: number, message: string, details?: unknown) {
		super(message);
		this.name = "AppError";
		this.statusCode = statusCode;
		this.details = details;
		Error.captureStackTrace(this, AppError);
	}
}

export const badRequest = (message: string, details?: unknown): AppError => new AppError(400, message, details);

export const notFound = (message: string, details?: unknown): AppError => new AppError(404, message, details);

export default AppError;
