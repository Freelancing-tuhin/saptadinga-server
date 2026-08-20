"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResults = exports.sendResult = exports.respond = void 0;
/**
 * Response helpers. The payload is spread alongside `message` so existing
 * response shapes (`{ message, result }`, `{ message, results }`, the flat
 * dashboard-stats bodies) stay exactly as clients expect them.
 */
const respond = (res, statusCode, message, payload = {}) => res.status(statusCode).json(Object.assign({ message }, payload));
exports.respond = respond;
/** `{ message, result }` — the shape used by most endpoints. */
const sendResult = (res, message, result) => (0, exports.respond)(res, 200, message, { result });
exports.sendResult = sendResult;
/** `{ message, results }` — the shape used by the booking-calendar endpoints. */
const sendResults = (res, message, results) => (0, exports.respond)(res, 200, message, { results });
exports.sendResults = sendResults;
