import { jsx as _jsx } from "react/jsx-runtime";
/**
 * EmailRenderer - Server-safe React component for rendering Puck email data
 *
 * Wraps Puck's Render with email config.
 * For producing HTML strings, use renderToEmailHtml() instead.
 */ import { Render } from '@puckeditor/core';
import { emailBaseConfig } from '../config/config.email.js';
/**
 * Renders Puck email data as React elements.
 * Server-safe — no hooks or client-side interactivity.
 */ export function EmailRenderer({ data, config = emailBaseConfig }) {
    if (!data || !data.content) {
        return null;
    }
    return /*#__PURE__*/ _jsx(Render, {
        config: config,
        data: data
    });
}
