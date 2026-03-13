/**
 * Email builder exports
 *
 * @example
 * ```tsx
 * import {
 *   emailBaseConfig,
 *   emailEditorConfig,
 *   renderToEmailHtml,
 *   EmailRenderer,
 * } from '@delmaredigital/payload-puck/email'
 * ```
 */
export { emailBaseConfig } from '../config/config.email.js';
export { emailEditorConfig } from '../config/config.email.editor.js';
export { EmailRenderer } from './EmailRenderer.js';
export type { EmailRendererProps } from './EmailRenderer.js';
export { renderToEmailHtml } from './renderToEmailHtml.js';
export type { RenderToEmailHtmlOptions } from './renderToEmailHtml.js';
export { getEmailDocumentParts, EMAIL_RESET_CSS } from './email-document.js';
export type { EmailDocumentOptions } from './email-document.js';
export { TABLE_ATTRS, FULL_WIDTH_TABLE_STYLE, centeredTableStyle, emailAlign, alignmentToMargin, WEB_SAFE_FONTS, tiptapHtmlToEmailHtml, vmlBackgroundOpen, vmlBackgroundClose, } from '../components/email/utils.js';
export type { WebSafeFont } from '../components/email/utils.js';
