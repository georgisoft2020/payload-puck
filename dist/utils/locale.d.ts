/**
 * Locale Resolver - Determines the locale to use for a Payload operation based on multiple sources.
*/
import { PayloadHandler } from "payload";
import { NextRequest } from "next/server";
/**
 * Resolves the locale to use for a Payload operation.
 *
 * Priority:
 *   1. Explicit `_locale` field in the request body (sent by PuckEditor)
 *   2. `?locale=` query param  (standard REST convention, already parsed by Payload)
 *   3. `req.locale` set by Payload's middleware (from admin UI context)
 */
export declare function resolveLocale(req: Parameters<PayloadHandler>[0], bodyLocale?: string): string | undefined;
/**
 * Resolves the locale from NextRequest
*/
export declare function resolveLocaleFromNextRequest(req: NextRequest, bodyLocale?: string): string | undefined;
