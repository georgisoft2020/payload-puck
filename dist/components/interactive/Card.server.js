/**
 * Card Component - Server-safe Puck Configuration
 *
 * Content card with image, heading, and text.
 * This version contains only the render function and types - no fields.
 * Safe for use in server components.
 */ import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { shadowMap, cn, marginValueToCSS, paddingValueToCSS, backgroundValueToCSS, borderValueToCSS, dimensionsValueToCSS, transformValueToCSS } from '../../fields/shared.js';
import { AnimatedWrapper } from '../AnimatedWrapper.js';
// Default content padding for card (replaces hardcoded p-4)
const DEFAULT_CONTENT_PADDING = {
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
    unit: 'px',
    linked: true
};
const defaultProps = {
    image: null,
    heading: 'Card Heading',
    text: 'Card description text goes here.',
    link: '',
    openInNewTab: false,
    shadow: 'md',
    margin: null,
    background: null,
    border: null,
    dimensions: null,
    alignment: null,
    transform: null,
    animation: null,
    contentPadding: DEFAULT_CONTENT_PADDING
};
export const CardConfig = {
    label: 'Card',
    defaultProps,
    render: ({ image, heading, text, link, openInNewTab, shadow, background, dimensions, alignment, margin, border, transform, animation, contentPadding })=>{
        // Check if border has radius, if so don't apply rounded-lg
        const hasBorderRadius = border?.radius && border.radius > 0;
        const cardClasses = cn('overflow-hidden transition-all bg-card', !hasBorderRadius && 'rounded-lg', shadowMap[shadow] || '', link && 'hover:shadow-lg cursor-pointer');
        // Wrapper style for margin, dimensions, alignment, transform, animation
        const wrapperStyle = {};
        const marginCSS = marginValueToCSS(margin);
        if (marginCSS) {
            wrapperStyle.margin = marginCSS;
        }
        const dimensionsStyles = dimensionsValueToCSS(dimensions);
        if (dimensionsStyles) {
            Object.assign(wrapperStyle, dimensionsStyles);
        }
        const transformStyles = transformValueToCSS(transform);
        if (transformStyles) {
            Object.assign(wrapperStyle, transformStyles);
        }
        // Alignment classes for wrapper
        const alignmentValue = alignment ?? 'left';
        const alignmentClasses = cn('flex', alignmentValue === 'left' && 'justify-start', alignmentValue === 'center' && 'justify-center', alignmentValue === 'right' && 'justify-end');
        // Card background styles from BackgroundValue
        const backgroundStyles = backgroundValueToCSS(background);
        const cardStyle = {
            ...backgroundStyles
        };
        // Note: bg-card class handles default background (theme-aware)
        // Apply border to card
        const borderStyles = borderValueToCSS(border);
        if (borderStyles) {
            Object.assign(cardStyle, borderStyles);
        }
        // Content section style with configurable padding
        const contentStyle = {};
        const contentPaddingCSS = paddingValueToCSS(contentPadding);
        if (contentPaddingCSS) {
            contentStyle.padding = contentPaddingCSS;
        }
        const cardContent = /*#__PURE__*/ _jsxs("div", {
            className: cardClasses,
            style: cardStyle,
            children: [
                image?.url ? /*#__PURE__*/ _jsx("div", {
                    className: "relative aspect-video w-full overflow-hidden",
                    children: /*#__PURE__*/ _jsx("img", {
                        src: image.url,
                        alt: image.alt || heading || '',
                        className: "w-full h-full object-cover"
                    })
                }) : /*#__PURE__*/ _jsx("div", {
                    className: "aspect-video w-full bg-muted flex items-center justify-center",
                    children: /*#__PURE__*/ _jsx("span", {
                        className: "text-muted-foreground",
                        children: "No image"
                    })
                }),
                /*#__PURE__*/ _jsxs("div", {
                    style: contentStyle,
                    children: [
                        heading && /*#__PURE__*/ _jsx("h3", {
                            className: "text-lg font-semibold text-foreground mb-2",
                            children: heading
                        }),
                        text && /*#__PURE__*/ _jsx("p", {
                            className: "text-muted-foreground text-sm",
                            children: text
                        })
                    ]
                })
            ]
        });
        if (link) {
            return /*#__PURE__*/ _jsx(AnimatedWrapper, {
                animation: animation,
                children: /*#__PURE__*/ _jsx("div", {
                    className: alignmentClasses,
                    children: /*#__PURE__*/ _jsx("a", {
                        href: link,
                        target: openInNewTab ? '_blank' : undefined,
                        rel: openInNewTab ? 'noopener noreferrer' : undefined,
                        className: "block",
                        style: wrapperStyle,
                        children: cardContent
                    })
                })
            });
        }
        return /*#__PURE__*/ _jsx(AnimatedWrapper, {
            animation: animation,
            children: /*#__PURE__*/ _jsx("div", {
                className: alignmentClasses,
                children: /*#__PURE__*/ _jsx("div", {
                    style: wrapperStyle,
                    children: cardContent
                })
            })
        });
    }
};
