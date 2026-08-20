import { Response } from "express";

/**
 * Response helpers. The payload is spread alongside `message` so existing
 * response shapes (`{ message, result }`, `{ message, results }`, the flat
 * dashboard-stats bodies) stay exactly as clients expect them.
 */

export const respond = <T extends Record<string, unknown>>(
	res: Response,
	statusCode: number,
	message: string,
	payload: T = {} as T
): Response => res.status(statusCode).json({ message, ...payload });

/** `{ message, result }` — the shape used by most endpoints. */
export const sendResult = (res: Response, message: string, result: unknown): Response =>
	respond(res, 200, message, { result });

/** `{ message, results }` — the shape used by the booking-calendar endpoints. */
export const sendResults = (res: Response, message: string, results: unknown): Response =>
	respond(res, 200, message, { results });
