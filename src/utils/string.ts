/**
 * Escapes regex metacharacters so a stored value (a page slug, say) can be
 * embedded in a RegExp literally instead of being interpreted as a pattern.
 */
export const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
