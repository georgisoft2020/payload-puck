/**
 * renderToEmailHtml - Produces a complete email HTML string from Puck data
 *
 * Uses React's renderToStaticMarkup to generate static HTML,
 * then wraps it in the email document shell with reset CSS.
 */
import type { Config as PuckConfig, Data as PuckData } from '@puckeditor/core';
export interface RenderToEmailHtmlOptions {
    /** Puck config to use (defaults to emailBaseConfig) */
    config?: PuckConfig;
}
/**
 * Renders Puck data to a complete email HTML string.
 *
 * @example
 * ```ts
 * import { renderToEmailHtml } from '@delmaredigital/payload-puck/email'
 *
 * const html = renderToEmailHtml(emailData)
 * await sendEmail({ to: 'user@example.com', html })
 * ```
 */
export declare function renderToEmailHtml(data: PuckData, options?: RenderToEmailHtmlOptions): string;
