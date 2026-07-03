/**
 * Styles Endpoint Handler
 *
 * Compiles and serves CSS for the editor iframe.
 * Uses the consumer's PostCSS/Tailwind installation via peer dependencies.
 * Loads the project's postcss.config.js for proper plugin configuration.
 */

import type { PayloadHandler } from 'payload'
import { readFileSync, statSync, existsSync } from 'fs'
import { join } from 'path'
import prefixSelector from 'postcss-prefix-selector'

// Cache compiled CSS in memory with file modification time tracking
interface CssCache {
  css: string
  mtime: number
}

const cssCache = new Map<string, CssCache>()

/**
 * Scopes compiled CSS so it can only match elements inside the Puck
 * preview iframe, never the Payload admin host page. `html`/`:root`
 * rules target `html[data-puck-preview]` directly (the iframe's own
 * `<html>` element, marked by IframeWrapper) rather than as a descendant
 * — `:root` IS that element, not something nested inside it. `body`
 * rules and everything else scope as normal descendants, since they
 * genuinely are descendants of the marked `<html>` once mirrored into
 * the iframe. On the host page, `<html>` is never marked, so none of
 * these selectors can ever match anything there — this is what actually
 * prevents the leak (an earlier attempt using a CSS `@layer` did not
 * work, because Payload's own admin CSS is also Tailwind-based and also
 * uses layers, so "unlayered beats layered" didn't apply).
 */
async function scopeToIframe(css: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postcss: any = (await import(/* webpackIgnore: true */ 'postcss')).default
  const prefix = 'html[data-puck-preview]'
  const result = await postcss([
    prefixSelector({
      prefix,
      transform: (_prefix: string, selector: string, prefixedSelector: string) => {
        const trimmed = selector.trim()
        if (trimmed === 'html' || trimmed === ':root') return prefix
        if (trimmed === 'body') return `${prefix} body`
        return prefixedSelector
      },
    }),
  ]).process(css, { from: undefined }).async()
  return result.css
}

/**
 * Compile CSS using PostCSS with the project's configuration
 * Loads postcss.config.js from project root for proper plugin setup
 * Falls back to minimal Tailwind-only config if no config file found
 */
async function compileCss(css: string, filePath: string): Promise<string> {
  try {
    // Dynamic import to use consumer's PostCSS installation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let postcss: any
    try {
      postcss = (await import(/* webpackIgnore: true */ 'postcss')).default
    } catch {
      console.warn(
        '[payload-puck] PostCSS not found. CSS will not be processed. Install postcss as a dependency.'
      )
      return css
    }

    // Try to load the project's postcss.config.js using postcss-load-config
    // This ensures all plugins (typography, etc.) are properly loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let processor: any
    let usedProjectConfig = false
    try {
      // Dynamic import of postcss-load-config (optional peer dependency)
      // This package is commonly installed alongside PostCSS
      const loadConfigModule = await import(
        /* webpackIgnore: true */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - optional dependency may not have types
        'postcss-load-config'
      )
      const postcssLoadConfig = loadConfigModule.default
      // Load config from project root (where postcss.config.js lives)
      const { plugins } = await postcssLoadConfig({}, process.cwd())
      processor = postcss(plugins)
      usedProjectConfig = true
    } catch {
      // postcss-load-config not available or no config found - this is fine
      // Fall back to direct Tailwind import silently

      // Try Tailwind v4 first (@tailwindcss/postcss)
      try {
        const tailwindcss = (
          await import(/* webpackIgnore: true */ '@tailwindcss/postcss')
        ).default
        processor = postcss([tailwindcss])
      } catch {
        // Fall back to Tailwind v3 (tailwindcss)
        try {
          const tailwindcss = (
            await import(/* webpackIgnore: true */ 'tailwindcss')
          ).default
          processor = postcss([tailwindcss])
        } catch {
          // No Tailwind available - just return the CSS as-is
          console.warn(
            '[payload-puck] No Tailwind CSS installation found. CSS will not be processed.'
          )
          return css
        }
      }
    }

    const result = await processor.process(css, { from: filePath })
    return result.css
  } catch (error) {
    console.error('[payload-puck] CSS compilation error:', error)
    throw error
  }
}

/**
 * Creates a handler that serves compiled CSS for the editor iframe
 *
 * @param cssFilePath - Path to CSS file relative to project root
 * @returns PayloadHandler that serves compiled CSS
 */
export function createStylesHandler(cssFilePath: string): PayloadHandler {
  return async () => {
    try {
      const fullPath = join(process.cwd(), cssFilePath)

      // Check if file exists
      if (!existsSync(fullPath)) {
        console.error(`[payload-puck] CSS file not found: ${fullPath}`)
        return new Response(`/* CSS file not found: ${cssFilePath} */`, {
          status: 404,
          headers: {
            'Content-Type': 'text/css',
          },
        })
      }

      // Get file modification time for cache invalidation
      const stats = statSync(fullPath)
      const mtime = stats.mtimeMs

      // Check cache
      const cached = cssCache.get(cssFilePath)
      if (cached && cached.mtime === mtime) {
        return new Response(cached.css, {
          headers: {
            'Content-Type': 'text/css',
            'Cache-Control': 'public, max-age=31536000, immutable',
            'X-Puck-Cache': 'hit',
          },
        })
      }

      // Read and compile CSS
      const rawCss = readFileSync(fullPath, 'utf-8')
      const compiledCss = await compileCss(rawCss, fullPath)
      const scopedCss = await scopeToIframe(compiledCss)

      // Update cache
      cssCache.set(cssFilePath, { css: scopedCss, mtime })

      return new Response(scopedCss, {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Puck-Cache': 'miss',
        },
      })
    } catch (error) {
      console.error('[payload-puck] Styles endpoint error:', error)
      return new Response(
        `/* Error compiling CSS: ${error instanceof Error ? error.message : 'Unknown error'} */`,
        {
          status: 500,
          headers: {
            'Content-Type': 'text/css',
          },
        }
      )
    }
  }
}

/**
 * Helper constant for the styles endpoint URL
 */
export const PUCK_STYLES_ENDPOINT = '/api/puck/styles'
