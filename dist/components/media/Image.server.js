/**
 * Image Component - Server-safe Puck Configuration
 *
 * Standalone image block with optional link wrapper.
 * This version contains only the render function and types - no fields.
 * Safe for use in server components.
 */ import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { aspectRatioMap, cn, marginValueToCSS, paddingValueToCSS, dimensionsValueToCSS, borderValueToCSS, transformValueToCSS, visibilityValueToCSS } from '../../fields/shared.js';
import { AnimatedWrapper } from '../AnimatedWrapper.js';
// Default padding with standard spacing (replaces hardcoded py-4 px-4)
const DEFAULT_PADDING = {
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
    unit: 'px',
    linked: true
};
// Simple ID generator for server-side rendering
let idCounter = 0;
function generateUniqueId() {
    return `i${(++idCounter).toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
const defaultProps = {
    image: null,
    alt: '',
    aspectRatio: 'auto',
    link: '',
    openInNewTab: false,
    margin: null,
    border: null,
    dimensions: null,
    alignment: null,
    transform: null,
    animation: null,
    customPadding: DEFAULT_PADDING,
    visibility: null
};
export const ImageConfig = {
    label: 'Image',
    defaultProps,
    render: ({ image, alt, aspectRatio, link, openInNewTab, dimensions, alignment, margin, border, transform, animation, customPadding, visibility })=>{
        // Generate unique ID for CSS targeting (server-safe)
        const uniqueId = generateUniqueId();
        const wrapperClass = `puck-image-${uniqueId}`;
        // Visibility media queries
        const visibilityCSS = visibilityValueToCSS(visibility, wrapperClass);
        const dimensionsStyles = dimensionsValueToCSS(dimensions);
        const style = {
            ...dimensionsStyles
        };
        const marginCSS = marginValueToCSS(margin);
        if (marginCSS) {
            style.margin = marginCSS;
        }
        const paddingCSS = paddingValueToCSS(customPadding);
        if (paddingCSS) {
            style.padding = paddingCSS;
        }
        const borderStyles = borderValueToCSS(border);
        if (borderStyles) {
            Object.assign(style, borderStyles);
        }
        const transformStyles = transformValueToCSS(transform);
        if (transformStyles) {
            Object.assign(style, transformStyles);
        }
        const alignmentValue = alignment ?? 'center';
        const alignmentClasses = cn('flex', alignmentValue === 'left' && 'justify-start', alignmentValue === 'center' && 'justify-center', alignmentValue === 'right' && 'justify-end');
        // Placeholder if no image
        if (!image?.url) {
            return /*#__PURE__*/ _jsxs(AnimatedWrapper, {
                animation: animation,
                children: [
                    visibilityCSS && /*#__PURE__*/ _jsx("style", {
                        children: visibilityCSS
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: wrapperClass,
                        style: Object.keys(style).length > 0 ? style : undefined,
                        children: /*#__PURE__*/ _jsx("div", {
                            className: alignmentClasses,
                            children: /*#__PURE__*/ _jsx("div", {
                                className: cn('relative overflow-hidden rounded-lg w-full max-w-md bg-muted flex items-center justify-center min-h-[200px]', aspectRatioMap[aspectRatio] || ''),
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: "text-muted-foreground",
                                    children: "No image selected"
                                })
                            })
                        })
                    })
                ]
            });
        }
        // For auto aspect ratio, use natural image dimensions
        // For fixed aspect ratios, use absolute positioning within aspect-ratio container
        // Note: When using aspect ratios in Flex, set a min-width via Dimensions
        const imageElement = aspectRatio === 'auto' ? /*#__PURE__*/ _jsx("div", {
            className: "relative overflow-hidden rounded-lg w-full",
            children: /*#__PURE__*/ _jsx("img", {
                src: image.url,
                alt: alt || image.alt || '',
                className: "w-full h-auto object-cover"
            })
        }) : /*#__PURE__*/ _jsx("div", {
            className: cn('relative overflow-hidden rounded-lg w-full', aspectRatioMap[aspectRatio]),
            children: /*#__PURE__*/ _jsx("img", {
                src: image.url,
                alt: alt || image.alt || '',
                className: "absolute inset-0 w-full h-full object-cover"
            })
        });
        const content = link ? /*#__PURE__*/ _jsx("a", {
            href: link,
            target: openInNewTab ? '_blank' : undefined,
            rel: openInNewTab ? 'noopener noreferrer' : undefined,
            className: "block transition-opacity hover:opacity-90",
            children: imageElement
        }) : imageElement;
        return /*#__PURE__*/ _jsxs(AnimatedWrapper, {
            animation: animation,
            children: [
                visibilityCSS && /*#__PURE__*/ _jsx("style", {
                    children: visibilityCSS
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: wrapperClass,
                    style: Object.keys(style).length > 0 ? style : undefined,
                    children: /*#__PURE__*/ _jsx("div", {
                        className: alignmentClasses,
                        children: content
                    })
                })
            ]
        });
    }
};
