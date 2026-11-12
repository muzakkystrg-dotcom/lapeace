/**
 * SITAPAK Security Sanitizer & Input Encoding Utility
 * Standard: OWASP Top 10 A03:2021-Injection & XSS Prevention
 */

/**
 * Escape HTML special characters to prevent Reflected/Stored XSS
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Strip dangerous HTML tags, inline event handlers, and javascript pseudo-protocols
 */
export function stripDangerousHtml(input: string): string {
  if (!input) return '';
  let sanitized = String(input);

  // 1. Remove null bytes and control characters
  sanitized = sanitized.replace(/\0/g, '');

  // 2. Remove script, iframe, object, embed, applet, form, and style tags entirely
  sanitized = sanitized.replace(/<\s*(script|iframe|object|embed|applet|form|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
  sanitized = sanitized.replace(/<\s*(script|iframe|object|embed|applet|form|style)[^>]*>/gi, '');

  // 3. Strip inline event handlers (e.g. onload=, onclick=, onerror=, onfocus=)
  sanitized = sanitized.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '');
  sanitized = sanitized.replace(/\son\w+\s*=\s*[^>\s]+/gi, '');

  // 4. Strip javascript: and vbscript: pseudo protocols
  sanitized = sanitized.replace(/(javascript|vbscript|data):/gi, '$1_blocked:');

  // 5. Strip all residual HTML tags for text-only inputs
  sanitized = sanitized.replace(/<[^>]*>?/gm, '');

  return sanitized.trim();
}

/**
 * Escapes characters with special meaning in SQL LIKE clauses (%, _, /)
 * To be used with SQLite `LIKE ? ESCAPE '/'`
 */
export function escapeSqlLike(str: string): string {
  if (!str) return '';
  return str.replace(/([%_\/])/g, '/$1');
}

/**
 * Recursively sanitizes all string properties in a payload
 */
export function sanitizePayload<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return stripDangerousHtml(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizePayload(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    // Prototype pollution defense
    const sanitizedObj: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }
      sanitizedObj[key] = sanitizePayload(value);
    }
    return sanitizedObj as unknown as T;
  }

  return data;
}
