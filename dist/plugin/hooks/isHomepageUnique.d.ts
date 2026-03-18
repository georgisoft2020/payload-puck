import type { CollectionBeforeChangeHook } from 'payload';
import { APIError } from 'payload';
/**
 * Information about an existing homepage page
 */
export interface ExistingHomepageInfo {
    id: string;
    title: string;
    slug: string;
}
/**
 * Error thrown when attempting to set a second page as homepage.
 * Contains information about the existing homepage for client-side handling.
 */
export declare class HomepageConflictError extends APIError {
    existingHomepage: ExistingHomepageInfo;
    constructor(existingHomepage: ExistingHomepageInfo);
}
/**
 * Options for the isHomepage uniqueness hook
 */
export interface IsHomepageUniqueHookOptions {
    /**
     * Collection slug to query for existing homepage.
     * Defaults to the current collection.
     */
    collectionSlug?: string;
}
/**
 * Creates a beforeChange hook that ensures only one page can have isHomepage: true.
 *
 * When a user tries to set isHomepage to true on a page, this hook:
 * 1. Checks if another page already has isHomepage: true
 * 2. If found, throws a HomepageConflictError with the existing page info
 * 3. The client can then prompt the user to swap homepages
 *
 * @example
 * ```typescript
 * import { createIsHomepageUniqueHook } from '@delmaredigital/payload-puck/plugin'
 *
 * const Pages: CollectionConfig = {
 *   slug: 'pages',
 *   hooks: {
 *     beforeChange: [createIsHomepageUniqueHook()],
 *   },
 *   fields: [...],
 * }
 * ```
 */
export declare function createIsHomepageUniqueHook(options?: IsHomepageUniqueHookOptions): CollectionBeforeChangeHook;
/**
 * Unsets isHomepage on the specified page.
 * Used when swapping homepages.
 */
export declare function unsetHomepage(payload: any, collectionSlug: string, pageId: string, locale?: string): Promise<void>;
