/**
 * Theme Module
 *
 * Provides dynamic theming capabilities for payload-puck components.
 *
 * @example
 * ```tsx
 * import { ThemeProvider, useTheme, getVariantClasses } from '@delmaredigital/payload-puck/theme'
 *
 * // In your app
 * <ThemeProvider theme={{
 *   buttonVariants: {
 *     default: { classes: 'bg-primary text-primary-foreground' }
 *   }
 * }}>
 *   <PageRenderer data={data} />
 * </ThemeProvider>
 *
 * // In a component
 * function CustomButton({ variant }) {
 *   const theme = useTheme()
 *   const classes = getVariantClasses(theme.buttonVariants, variant)
 *   return <button className={classes}>...</button>
 * }
 * ```
 */
export type { ButtonVariantConfig, ButtonVariantStyles, ColorPreset, BackgroundStyles, ThemeConfig, ResolvedTheme, ThemeContextValue, } from './types.js';
export { ThemeProvider, useTheme, getDefaultTheme, useHasThemeProvider, type ThemeProviderProps, } from './context.js';
export { DEFAULT_BUTTON_VARIANTS, DEFAULT_CTA_BUTTON_VARIANTS, DEFAULT_CTA_BACKGROUND_STYLES, DEFAULT_COLOR_PRESETS, DEFAULT_FOCUS_RING, DEFAULT_THEME, } from './defaults.js';
export { resolveTheme, getVariantClasses, getBackgroundClasses } from './utils.js';
export { exampleTheme } from './example.js';
