/**
 * renderToEmailHtml - Produces a complete email HTML string from Puck data
 *
 * Uses React's renderToStaticMarkup to generate static HTML,
 * then wraps it in the email document shell with reset CSS.
 */ import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { EmailRenderer } from './EmailRenderer.js';
import { getEmailDocumentParts } from './email-document.js';
import { colorValueToEmailCSS } from '../fields/shared.js';
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
 */ export function renderToEmailHtml(data, options = {}) {
    const rootProps = data.root?.props;
    // Resolve backgroundColor — could be a ColorValue object or plain string
    let bgColor = '#f4f4f4';
    if (rootProps?.backgroundColor) {
        if (typeof rootProps.backgroundColor === 'string') {
            bgColor = rootProps.backgroundColor;
        } else {
            bgColor = colorValueToEmailCSS(rootProps.backgroundColor) ?? '#f4f4f4';
        }
    }
    const { before, after } = getEmailDocumentParts({
        previewText: rootProps?.previewText,
        backgroundColor: bgColor,
        fontFamily: rootProps?.fontFamily,
        maxWidth: rootProps?.maxWidth
    });
    const contentHtml = renderToStaticMarkup(React.createElement(EmailRenderer, {
        data,
        config: options.config
    }));
    return before + contentHtml + after;
}
