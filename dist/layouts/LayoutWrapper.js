/**
 * Layout Wrapper Component
 *
 * Wraps page content with layout-specific styling and structure.
 */ import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { backgroundValueToCSS } from '../fields/shared.js';
/**
 * Styles for sticky footer layout - pushes footer to bottom of viewport
 */ const stickyFooterContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
};
const stickyFooterMainStyle = {
    flex: 1
};
/**
 * Applies layout configuration to page content
 */ export function LayoutWrapper({ children, layout, className, overrides }) {
    // No layout - render children directly (but still apply background if set)
    if (!layout) {
        if (overrides?.background) {
            const bgStyles = backgroundValueToCSS(overrides.background);
            return /*#__PURE__*/ _jsx("div", {
                style: {
                    minHeight: '100vh',
                    ...bgStyles
                },
                children: children
            });
        }
        return /*#__PURE__*/ _jsx(_Fragment, {
            children: children
        });
    }
    // Get header/footer components
    const Header = layout.header;
    const Footer = layout.footer;
    // Determine header/footer visibility based on overrides
    const shouldShowHeader = overrides?.showHeader === 'hide' ? false : overrides?.showHeader === 'show' ? true : !!Header;
    const shouldShowFooter = overrides?.showFooter === 'hide' ? false : overrides?.showFooter === 'show' ? true : !!Footer;
    // Sticky footer is enabled by default - check for explicit false
    const useStickyFooter = layout.stickyFooter !== false;
    // Calculate main content style with sticky header offset
    const mainStyle = {
        ...layout.stickyHeaderHeight && shouldShowHeader ? {
            paddingTop: layout.stickyHeaderHeight
        } : {},
        ...useStickyFooter ? stickyFooterMainStyle : {}
    };
    // Build outer container background styles
    // Page override takes precedence, then falls back to layout wrapper background
    const wrapperStyles = layout.styles?.wrapper;
    const outerBackgroundStyles = overrides?.background ? backgroundValueToCSS(overrides.background) : {
        ...wrapperStyles?.background !== undefined ? {
            background: wrapperStyles.background
        } : {},
        ...wrapperStyles?.backgroundAttachment !== undefined ? {
            backgroundAttachment: wrapperStyles.backgroundAttachment
        } : {}
    };
    // Get effective max width (override or layout default)
    const effectiveMaxWidth = overrides?.maxWidth && overrides.maxWidth !== 'default' ? overrides.maxWidth : layout.maxWidth;
    // Helper to wrap content with sticky footer container if needed
    const wrapWithStickyFooter = (content)=>{
        if (useStickyFooter) {
            return /*#__PURE__*/ _jsx("div", {
                style: {
                    ...stickyFooterContainerStyle,
                    ...outerBackgroundStyles
                },
                children: content
            });
        }
        // Non-sticky-footer: still apply background if set
        const hasBackground = Object.keys(outerBackgroundStyles).length > 0;
        if (hasBackground) {
            return /*#__PURE__*/ _jsx("div", {
                style: {
                    minHeight: '100vh',
                    ...outerBackgroundStyles
                },
                children: content
            });
        }
        return /*#__PURE__*/ _jsx(_Fragment, {
            children: content
        });
    };
    // Custom wrapper component takes precedence
    if (layout.wrapper) {
        const CustomWrapper = layout.wrapper;
        return wrapWithStickyFooter(/*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                shouldShowHeader && Header && /*#__PURE__*/ _jsx(Header, {}),
                /*#__PURE__*/ _jsx("main", {
                    style: Object.keys(mainStyle).length > 0 ? mainStyle : undefined,
                    children: /*#__PURE__*/ _jsx(CustomWrapper, {
                        children: children
                    })
                }),
                shouldShowFooter && Footer && /*#__PURE__*/ _jsx(Footer, {})
            ]
        }));
    }
    // Build wrapper styles
    const wrapperStyle = {
        ...layout.styles?.wrapper
    };
    // Build container styles with effective max width
    const containerStyle = {
        ...effectiveMaxWidth && !layout.fullWidth ? {
            maxWidth: effectiveMaxWidth
        } : {},
        ...layout.styles?.container
    };
    // Build content styles
    const contentStyle = {
        ...layout.styles?.content
    };
    // Build data attributes
    const dataAttrs = {
        'data-layout': layout.value,
        ...layout.dataAttributes
    };
    // For landing/full-width layouts, render without container constraints
    if (layout.fullWidth) {
        return wrapWithStickyFooter(/*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                shouldShowHeader && Header && /*#__PURE__*/ _jsx(Header, {}),
                /*#__PURE__*/ _jsx("main", {
                    className: [
                        layout.classes?.wrapper,
                        className
                    ].filter(Boolean).join(' ') || undefined,
                    style: {
                        ...mainStyle,
                        ...Object.keys(wrapperStyle).length > 0 ? wrapperStyle : {}
                    },
                    ...dataAttrs,
                    children: children
                }),
                shouldShowFooter && Footer && /*#__PURE__*/ _jsx(Footer, {})
            ]
        }));
    }
    // Standard layout with container
    return wrapWithStickyFooter(/*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            shouldShowHeader && Header && /*#__PURE__*/ _jsx(Header, {}),
            /*#__PURE__*/ _jsx("main", {
                className: layout.classes?.wrapper || undefined,
                style: {
                    ...mainStyle,
                    ...Object.keys(wrapperStyle).length > 0 ? wrapperStyle : {}
                },
                ...dataAttrs,
                children: /*#__PURE__*/ _jsx("div", {
                    className: [
                        layout.classes?.container,
                        className
                    ].filter(Boolean).join(' ') || undefined,
                    style: Object.keys(containerStyle).length > 0 ? containerStyle : undefined,
                    children: /*#__PURE__*/ _jsx("div", {
                        className: layout.classes?.content || undefined,
                        style: Object.keys(contentStyle).length > 0 ? contentStyle : undefined,
                        children: children
                    })
                })
            }),
            shouldShowFooter && Footer && /*#__PURE__*/ _jsx(Footer, {})
        ]
    }));
}
