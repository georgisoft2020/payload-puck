/**
 * Server-safe Puck configuration
 *
 * This config is safe for server-side rendering and should be used
 * with the PageRenderer component.
 */ import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { DEFAULT_LAYOUTS, layoutsToOptions } from '../layouts/index.js';
// Layout Components (server-safe versions)
import { ContainerConfig } from '../components/layout/Container.server.js';
import { FlexConfig } from '../components/layout/Flex.server.js';
import { GridConfig } from '../components/layout/Grid.server.js';
import { SectionConfig } from '../components/layout/Section.server.js';
import { SpacerConfig } from '../components/layout/Spacer.server.js';
import { TemplateServerConfig } from '../components/layout/Template.server.js';
// Typography Components (server-safe versions)
import { HeadingConfig } from '../components/typography/Heading.server.js';
import { TextConfig } from '../components/typography/Text.server.js';
import { RichTextConfig } from '../components/typography/RichText.server.js';
// Media Components (server-safe versions)
import { ImageConfig } from '../components/media/Image.server.js';
// Interactive Components (server-safe versions)
import { ButtonConfig } from '../components/interactive/Button.server.js';
import { CardConfig } from '../components/interactive/Card.server.js';
import { DividerConfig } from '../components/interactive/Divider.server.js';
import { AccordionConfig } from '../components/interactive/Accordion.server.js';
/**
 * Creates a Puck configuration with custom layouts
 *
 * @param layouts - Custom layout definitions
 * @returns Puck configuration with the specified layouts
 *
 * @example
 * ```tsx
 * import { createConfig, DEFAULT_LAYOUTS, createLayout } from '@delmaredigital/payload-puck/config'
 *
 * const customConfig = createConfig([
 *   ...DEFAULT_LAYOUTS,
 *   createLayout({
 *     value: 'blog',
 *     label: 'Blog Post',
 *     maxWidth: '720px',
 *   }),
 * ])
 * ```
 */ export function createConfig(layouts = DEFAULT_LAYOUTS) {
    const layoutOptions = layoutsToOptions(layouts);
    return {
        root: {
            fields: {
                title: {
                    type: 'text',
                    label: 'Page Title'
                },
                pageLayout: {
                    type: 'select',
                    label: 'Page Layout',
                    options: layoutOptions.map(({ value, label })=>({
                            value,
                            label
                        }))
                }
            },
            defaultProps: {
                title: 'New Page',
                pageLayout: 'default'
            },
            render: ({ children })=>/*#__PURE__*/ _jsx(_Fragment, {
                    children: children
                })
        },
        categories: {
            layout: {
                title: 'Layout',
                components: [
                    'Container',
                    'Flex',
                    'Grid',
                    'Section',
                    'Spacer',
                    'Template'
                ],
                defaultExpanded: true
            },
            typography: {
                title: 'Typography',
                components: [
                    'Heading',
                    'Text',
                    'RichText'
                ]
            },
            media: {
                title: 'Media',
                components: [
                    'Image'
                ]
            },
            interactive: {
                title: 'Interactive',
                components: [
                    'Button',
                    'Card',
                    'Divider',
                    'Accordion'
                ]
            }
        },
        components: {
            // Layout
            Container: ContainerConfig,
            Flex: FlexConfig,
            Grid: GridConfig,
            Section: SectionConfig,
            Spacer: SpacerConfig,
            Template: TemplateServerConfig,
            // Typography
            Heading: HeadingConfig,
            Text: TextConfig,
            RichText: RichTextConfig,
            // Media
            Image: ImageConfig,
            // Interactive
            Button: ButtonConfig,
            Card: CardConfig,
            Divider: DividerConfig,
            Accordion: AccordionConfig
        }
    };
}
/**
 * Base Puck configuration with server-safe component configs
 *
 * All components have server-safe versions (.server.tsx) that render
 * without client-side interactivity. Use editorConfig from ./config.editor
 * for the full interactive editor experience.
 *
 * For custom layouts, use createConfig() instead.
 */ export const baseConfig = createConfig(DEFAULT_LAYOUTS);
// Re-export merge utility and layout helpers
export { mergeConfigs, mergeConfigs as extendConfig } from './merge.js';
export { DEFAULT_LAYOUTS, createLayout } from '../layouts/index.js';
