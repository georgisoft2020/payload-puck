/**
 * Spacer Component - Server-safe Puck Configuration
 *
 * Simple spacing component for adding vertical or horizontal space.
 * Uses Tailwind classes for layout and sizing from predefined options.
 *
 * This is a server-safe version with NO fields property.
 * For the full editor version with fields, use Spacer.tsx
 *
 * Responsive Controls:
 * - visibility: Show/hide at different breakpoints
 */ import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn, visibilityValueToCSS } from '../../fields/shared.js';
// Simple ID generator for server-side rendering
let idCounter = 0;
function generateUniqueId() {
    return `sp${(++idCounter).toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
// Tailwind height classes for predefined spacing options
const heightMap = {
    '8px': 'h-2',
    '16px': 'h-4',
    '24px': 'h-6',
    '32px': 'h-8',
    '48px': 'h-12',
    '64px': 'h-16',
    '80px': 'h-20',
    '96px': 'h-24',
    '128px': 'h-32'
};
// Tailwind width classes for predefined spacing options
const widthMap = {
    '8px': 'w-2',
    '16px': 'w-4',
    '24px': 'w-6',
    '32px': 'w-8',
    '48px': 'w-12',
    '64px': 'w-16',
    '80px': 'w-20',
    '96px': 'w-24',
    '128px': 'w-32'
};
const defaultProps = {
    size: '24px',
    direction: 'vertical',
    visibility: null
};
export const SpacerConfig = {
    label: 'Spacer',
    defaultProps,
    render: ({ size, direction, visibility })=>{
        // Generate unique ID for CSS targeting (server-safe)
        const uniqueId = generateUniqueId();
        const wrapperClass = `puck-spacer-${uniqueId}`;
        // Visibility media queries
        const visibilityCSS = visibilityValueToCSS(visibility, wrapperClass);
        const getClasses = ()=>{
            const heightClass = heightMap[size] || 'h-6';
            const widthClass = widthMap[size] || 'w-6';
            if (direction === 'vertical') {
                return `block ${heightClass} w-full`;
            }
            if (direction === 'horizontal') {
                return `inline-block ${widthClass} h-full`;
            }
            // both
            return `block ${heightClass} ${widthClass}`;
        };
        return /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                visibilityCSS && /*#__PURE__*/ _jsx("style", {
                    children: visibilityCSS
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: cn(getClasses(), wrapperClass),
                    "aria-hidden": "true"
                })
            ]
        });
    }
};
