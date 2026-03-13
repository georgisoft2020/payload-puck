/**
 * Types for Puck field utilities
 *
 * These types support the getPuckFields() utility for hybrid collection integration.
 */ /**
 * Options for getPuckCollectionConfig() utility function
 *
 * Extends GetPuckFieldsOptions with hook configuration for hybrid collection integration.
 * Returns both fields AND hooks so you don't have to manually configure the isHomepage hook.
 *
 * @example
 * ```typescript
 * import { getPuckCollectionConfig } from '@delmaredigital/payload-puck'
 *
 * const { fields, hooks } = getPuckCollectionConfig({
 *   includeIsHomepage: true,
 *   includeSEO: false,
 * })
 *
 * const Pages: CollectionConfig = {
 *   slug: 'pages',
 *   hooks,
 *   fields: [
 *     { name: 'title', type: 'text', required: true },
 *     ...fields,
 *   ],
 * }
 * ```
 */ export { };
