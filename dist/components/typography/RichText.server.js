import { jsx as _jsx } from "react/jsx-runtime";
/**
 * RichText Component - Server-Safe Puck Configuration
 *
 * Rich text content with customizable styling.
 * This version excludes field definitions for server-side rendering.
 *
 * Requires @tailwindcss/typography - uses the `prose` class for styling.
 */ import React from 'react';
import parse from 'html-react-parser';
import { cn, marginValueToCSS, paddingValueToCSS, dimensionsValueToCSS, colorValueToCSS, alignmentMap } from '../../fields/shared.js';
import { AnimatedWrapper } from '../AnimatedWrapper.js';
// Default padding with standard horizontal spacing (replaces hardcoded px-4)
const DEFAULT_PADDING = {
    top: 0,
    right: 16,
    bottom: 0,
    left: 16,
    unit: 'px',
    linked: false
};
const defaultProps = {
    content: '<p>Enter your content here...</p>',
    alignment: null,
    textColor: null,
    dimensions: null,
    animation: null,
    margin: null,
    customPadding: DEFAULT_PADDING
};
export const RichTextConfig = {
    label: 'Rich Text',
    defaultProps,
    render: ({ content, alignment, textColor, dimensions, animation, margin, customPadding })=>{
        const dimensionsStyles = dimensions ? dimensionsValueToCSS(dimensions) : undefined;
        const style = {
            ...dimensionsStyles
        };
        const marginCSS = marginValueToCSS(margin);
        if (marginCSS) {
            style.margin = marginCSS;
        }
        const customPaddingCSS = paddingValueToCSS(customPadding);
        if (customPaddingCSS) {
            style.padding = customPaddingCSS;
        }
        // Apply text color from ColorValue
        const colorCSS = colorValueToCSS(textColor);
        if (colorCSS) {
            style.color = colorCSS;
        }
        const alignmentValue = alignment ?? 'left';
        const alignmentClass = alignmentMap[alignmentValue] || alignmentMap.left;
        // Handle empty content - check for null/undefined or empty string
        const isEmpty = !content || typeof content === 'string' && (content === '' || content === '<p></p>');
        // Parse HTML strings to React elements, pass through React elements as-is
        const renderedContent = isEmpty ? /*#__PURE__*/ _jsx("p", {
            children: /*#__PURE__*/ _jsx("em", {
                children: "No content available"
            })
        }) : typeof content === 'string' ? parse(content) : content;
        return /*#__PURE__*/ _jsx(AnimatedWrapper, {
            animation: animation,
            children: /*#__PURE__*/ _jsx("section", {
                className: cn('relative overflow-hidden', alignmentClass),
                style: Object.keys(style).length > 0 ? style : undefined,
                children: /*#__PURE__*/ _jsx("div", {
                    className: "prose dark:prose-invert max-w-none",
                    children: renderedContent
                })
            })
        });
    }
};
