import { jsx as _jsx } from "react/jsx-runtime";
import { Render } from '@puckeditor/core';
import { baseConfig } from '../config/index.js';
import { LayoutWrapper, getLayout, DEFAULT_LAYOUTS } from '../layouts/index.js';
/**
 * Renders a Puck page using the provided data and configuration
 *
 * @example
 * ```tsx
 * import { PageRenderer } from '@delmaredigital/payload-puck/render'
 * import { baseConfig } from '@delmaredigital/payload-puck/config'
 * import { ThemeProvider } from '@delmaredigital/payload-puck/theme'
 *
 * export default async function Page({ params }) {
 *   const page = await getPage(params.slug)
 *
 *   // Wrap with ThemeProvider if using theming
 *   return (
 *     <ThemeProvider theme={myTheme}>
 *       <PageRenderer data={page.puckData} config={baseConfig} />
 *     </ThemeProvider>
 *   )
 * }
 * ```
 */ export function PageRenderer({ data, config = baseConfig, wrapper: Wrapper, className, layouts = DEFAULT_LAYOUTS }) {
    // Handle empty or invalid data
    if (!data || !data.content) {
        return /*#__PURE__*/ _jsx("div", {
            className: className,
            children: /*#__PURE__*/ _jsx("p", {
                children: "No content available"
            })
        });
    }
    const content = /*#__PURE__*/ _jsx(Render, {
        config: config,
        data: data
    });
    // Extract root props for page-level settings
    const rootProps = data.root?.props;
    // Build page overrides from root props
    const overrides = {
        showHeader: rootProps?.showHeader,
        showFooter: rootProps?.showFooter,
        background: rootProps?.pageBackground,
        maxWidth: rootProps?.pageMaxWidth
    };
    // Build the component tree
    let result = content;
    // Custom wrapper takes precedence
    if (Wrapper) {
        result = /*#__PURE__*/ _jsx(Wrapper, {
            children: result
        });
    } else {
        // Apply layout from puck root props
        const pageLayout = rootProps?.pageLayout;
        const layout = pageLayout ? getLayout(layouts, pageLayout) : undefined;
        if (layout) {
            result = /*#__PURE__*/ _jsx(LayoutWrapper, {
                layout: layout,
                className: className,
                overrides: overrides,
                children: result
            });
        } else if (className || overrides.background) {
            // No layout but has background or className - use LayoutWrapper without layout
            result = /*#__PURE__*/ _jsx(LayoutWrapper, {
                className: className,
                overrides: overrides,
                children: result
            });
        }
    }
    return result;
}
