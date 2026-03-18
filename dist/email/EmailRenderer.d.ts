/**
 * EmailRenderer - Server-safe React component for rendering Puck email data
 *
 * Wraps Puck's Render with email config.
 * For producing HTML strings, use renderToEmailHtml() instead.
 */
import type { Config as PuckConfig, Data as PuckData } from '@puckeditor/core';
export interface EmailRendererProps {
    data: PuckData;
    config?: PuckConfig;
}
/**
 * Renders Puck email data as React elements.
 * Server-safe — no hooks or client-side interactivity.
 */
export declare function EmailRenderer({ data, config, }: EmailRendererProps): import("react").JSX.Element | null;
