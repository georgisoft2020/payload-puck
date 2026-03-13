'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * RichText Component - Puck Editor Configuration
 *
 * Uses Puck's native richtext field with custom extensions for:
 * - Text colors with opacity (RGBA)
 * - Highlight with multicolor support
 * - Font sizes (presets + custom)
 * - Superscript and subscript
 *
 * Supports contentEditable for inline canvas editing.
 * Requires @tailwindcss/typography - uses the `prose` class for styling.
 */ import React, { useMemo } from 'react';
import { marginValueToCSS, paddingValueToCSS, dimensionsValueToCSS } from '../../fields/shared.js';
import { createMarginField } from '../../fields/MarginField.js';
import { createPaddingField } from '../../fields/PaddingField.js';
import { createDimensionsField } from '../../fields/DimensionsField.js';
import { createResetField } from '../../fields/ResetField.js';
import { createRichTextField } from '../../fields/richtext/index.js';
const defaultProps = {
    content: '<p>Click to start editing...</p>',
    dimensions: null,
    margin: null,
    customPadding: null
};
// =============================================================================
// Render Component for Editor Config
// =============================================================================
// Uses Puck's native richtext field which supports inline contentEditable editing.
// Content is rendered directly as {content} - Puck handles the rest.
function RichTextRender({ content, dimensions, margin, customPadding }) {
    // Build styles
    const style = useMemo(()=>{
        const s = {};
        const dimensionsStyles = dimensions ? dimensionsValueToCSS(dimensions) : undefined;
        if (dimensionsStyles) {
            Object.assign(s, dimensionsStyles);
        }
        const marginCSS = marginValueToCSS(margin);
        if (marginCSS) {
            s.margin = marginCSS;
        }
        const customPaddingCSS = paddingValueToCSS(customPadding);
        if (customPaddingCSS) {
            s.padding = customPaddingCSS;
        }
        return Object.keys(s).length > 0 ? s : undefined;
    }, [
        dimensions,
        margin,
        customPadding
    ]);
    // Render content directly - Puck's richtext field handles both:
    // - Editor: Returns React elements for contentEditable inline editing
    // - Frontend <Render>: Returns HTML string which React renders
    return /*#__PURE__*/ _jsx("section", {
        className: "relative overflow-hidden",
        style: style,
        children: /*#__PURE__*/ _jsx("div", {
            className: "prose dark:prose-invert max-w-none",
            children: content
        })
    });
}
// =============================================================================
// Puck Component Config
// =============================================================================
export const RichTextEditorConfig = {
    label: 'Rich Text',
    fields: {
        _reset: createResetField({
            defaultProps
        }),
        content: createRichTextField({
            label: 'Content',
            contentEditable: true
        }),
        dimensions: createDimensionsField({
            label: 'Dimensions'
        }),
        margin: createMarginField({
            label: 'Margin'
        }),
        customPadding: createPaddingField({
            label: 'Padding'
        })
    },
    defaultProps,
    render: (props)=>/*#__PURE__*/ _jsx(RichTextRender, {
            content: props.content,
            dimensions: props.dimensions,
            margin: props.margin,
            customPadding: props.customPadding,
            id: props.id
        })
};
