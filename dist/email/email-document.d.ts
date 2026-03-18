/**
 * Email HTML Document Shell
 *
 * Provides the DOCTYPE, html, head, and body wrapper for email HTML.
 * Includes standard email reset CSS and MSO conditional comments.
 */
/**
 * Email reset CSS applied in a style block in the head.
 * These resets normalize rendering across email clients.
 */
export declare const EMAIL_RESET_CSS: string;
export interface EmailDocumentOptions {
    /** Preview text shown in inbox list */
    previewText?: string;
    /** Background color for the email body */
    backgroundColor?: string;
    /** Base font family */
    fontFamily?: string;
    /** Max width of email content in px */
    maxWidth?: number;
}
/**
 * Wraps email content in a complete HTML document.
 * Returns the opening HTML (before content) and closing HTML (after content).
 */
export declare function getEmailDocumentParts(options?: EmailDocumentOptions): {
    before: string;
    after: string;
};
