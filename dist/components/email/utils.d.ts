/**
 * Shared email rendering utilities
 *
 * Helpers for building email-safe HTML with table-based layouts.
 * All email components use these to ensure consistent rendering.
 */
import type React from 'react';
/** Standard table attributes for email-safe presentation tables */
export declare const TABLE_ATTRS: {
    readonly role: "presentation";
    readonly cellPadding: "0";
    readonly cellSpacing: "0";
    readonly border: 0;
};
/** Full-width table style (100% width, no borders) */
export declare const FULL_WIDTH_TABLE_STYLE: React.CSSProperties;
/** Centered content table (max-width with auto margins) */
export declare function centeredTableStyle(maxWidth: number): React.CSSProperties;
type EmailAlignment = 'left' | 'center' | 'right';
/** Maps alignment to table `align` attribute value */
export declare function emailAlign(alignment: EmailAlignment | null | undefined): 'left' | 'center' | 'right';
/** Maps alignment to margin style for block centering */
export declare function alignmentToMargin(alignment: EmailAlignment | null | undefined): React.CSSProperties;
export declare const WEB_SAFE_FONTS: readonly [{
    readonly label: "Arial";
    readonly value: "Arial, Helvetica, sans-serif";
}, {
    readonly label: "Helvetica";
    readonly value: "Helvetica, Arial, sans-serif";
}, {
    readonly label: "Georgia";
    readonly value: "Georgia, Times, serif";
}, {
    readonly label: "Times New Roman";
    readonly value: "'Times New Roman', Times, serif";
}, {
    readonly label: "Courier New";
    readonly value: "'Courier New', Courier, monospace";
}, {
    readonly label: "Verdana";
    readonly value: "Verdana, Geneva, sans-serif";
}, {
    readonly label: "Tahoma";
    readonly value: "Tahoma, Geneva, sans-serif";
}, {
    readonly label: "Trebuchet MS";
    readonly value: "'Trebuchet MS', Helvetica, sans-serif";
}];
export type WebSafeFont = (typeof WEB_SAFE_FONTS)[number]['value'];
/**
 * Converts TipTap-generated HTML to email-safe inline-styled HTML.
 *
 * TipTap outputs semantic HTML with classes. Email clients need:
 * - Inline styles instead of classes
 * - No CSS that email clients strip (position, display:flex, etc.)
 * - Block elements with explicit margins
 */
export declare function tiptapHtmlToEmailHtml(html: string, options?: {
    fontSize?: string;
    color?: string;
    lineHeight?: string;
    fontFamily?: string;
}): string;
/**
 * Generates VML markup for background images in Outlook.
 * Wrap around your content in a conditional comment.
 */
export declare function vmlBackgroundOpen(options: {
    width: number;
    height?: number;
    src: string;
}): string;
export declare function vmlBackgroundClose(): string;
export {};
