/**
 * Divider Component - Server-safe Puck Configuration
 *
 * Horizontal line separator with customizable style.
 * This version contains only the render function and types - no fields.
 * Safe for use in server components.
 */ import { jsx as _jsx } from "react/jsx-runtime";
import { dividerStyleMap, cn, marginValueToCSS, paddingValueToCSS, colorValueToCSS, dimensionsValueToCSS, transformValueToCSS } from '../../fields/shared.js';
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
    style: 'solid',
    color: null,
    margin: null,
    dimensions: null,
    transform: null,
    animation: null,
    customPadding: DEFAULT_PADDING
};
export const DividerConfig = {
    label: 'Divider',
    defaultProps,
    render: ({ style, color, dimensions, margin, transform, animation, customPadding })=>{
        const dimensionsStyles = dimensionsValueToCSS(dimensions);
        const wrapperStyle = {
            ...dimensionsStyles
        };
        const marginCSS = marginValueToCSS(margin);
        if (marginCSS) {
            wrapperStyle.margin = marginCSS;
        }
        const paddingCSS = paddingValueToCSS(customPadding);
        if (paddingCSS) {
            wrapperStyle.padding = paddingCSS;
        }
        const transformStyles = transformValueToCSS(transform);
        if (transformStyles) {
            Object.assign(wrapperStyle, transformStyles);
        }
        // Only set color if explicitly provided, otherwise use CSS variable
        const customColor = colorValueToCSS(color);
        const hrStyle = customColor ? {
            borderColor: customColor
        } : undefined;
        return /*#__PURE__*/ _jsx(AnimatedWrapper, {
            animation: animation,
            children: /*#__PURE__*/ _jsx("div", {
                style: Object.keys(wrapperStyle).length > 0 ? wrapperStyle : undefined,
                children: /*#__PURE__*/ _jsx("hr", {
                    className: cn('border-t border-border', dividerStyleMap[style] || dividerStyleMap.solid),
                    style: hrStyle
                })
            })
        });
    }
};
