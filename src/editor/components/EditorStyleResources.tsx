'use client'

export interface EditorStyleResourcesProps {
  /**
   * Stylesheet URLs to render as host-document resources.
   * Rendered with `precedence` so React hoists them into the real
   * document `<head>` — required for Puck's `syncHostStyles` to pick
   * them up, since it only observes `<head>` for live changes.
   */
  stylesheets?: string[]
  /**
   * Raw CSS to render as a host-document style resource.
   */
  css?: string
}

/**
 * Non-cryptographic string hash (djb2 variant) used to key the `<style>`
 * resource by content. React treats stylesheet resources as immutable by
 * their `href`/key — reusing a static id across renders with different
 * `css` content would not reliably update the DOM. Keying by content hash
 * makes a CSS change register as a new resource (old one removed, new one
 * added), which both makes React swap it correctly and gives Puck's
 * `CopyHostStyles` MutationObserver the add/remove-node event it needs to
 * re-mirror the change into the iframe.
 */
function hashCss(input: string): string {
  let hash = 5381
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i)
  }
  return (hash >>> 0).toString(36)
}

/**
 * Renders the consumer's editor stylesheets/CSS as host-document
 * resources so Puck's native `iframe.syncHostStyles` (default `true` in
 * `@puckeditor/core` >=0.22) mirrors them into the preview iframe.
 *
 * Render this once, high enough in the tree to be mounted whenever the
 * editor (or its preview modal) might be visible — both consume the same
 * host document, so a single instance covers both.
 */
export function EditorStyleResources({ stylesheets, css }: EditorStyleResourcesProps) {
  const cssKey = css ? `puck-editor-css-${hashCss(css)}` : undefined

  return (
    <>
      {stylesheets?.map((href) => (
        <link key={href} rel="stylesheet" href={href} precedence="puck-editor-styles" />
      ))}
      {css && cssKey ? (
        <style key={cssKey} href={cssKey} precedence="puck-editor-styles">
          {css}
        </style>
      ) : null}
    </>
  )
}
