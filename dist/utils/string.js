"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeRegExp = void 0;
/**
 * Escapes regex metacharacters so a stored value (a page slug, say) can be
 * embedded in a RegExp literally instead of being interpreted as a pattern.
 */
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
exports.escapeRegExp = escapeRegExp;
