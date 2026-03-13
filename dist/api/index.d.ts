/**
 * Puck API Routes
 *
 * Factory functions for creating Next.js App Router API route handlers
 * that integrate with PayloadCMS for Puck visual editor data management.
 *
 * @example
 * ```typescript
 * // src/app/api/puck/pages/route.ts
 * import { createPuckApiRoutes } from '@delmaredigital/payload-puck/api'
 *
 * export const { GET, POST } = createPuckApiRoutes({
 *   auth: {
 *     authenticate: async (request) => {
 *       // Your auth implementation
 *     },
 *   },
 * })
 * ```
 *
 * @example
 * ```typescript
 * // src/app/api/puck/pages/[id]/route.ts
 * import { createPuckApiRoutesWithId } from '@delmaredigital/payload-puck/api'
 *
 * export const { GET, PATCH, DELETE } = createPuckApiRoutesWithId({
 *   auth: {
 *     authenticate: async (request) => {
 *       // Your auth implementation
 *     },
 *   },
 * })
 * ```
 */
export { createPuckApiRoutes } from './createPuckApiRoutes.js';
export { createPuckApiRoutesWithId } from './createPuckApiRoutesWithId.js';
export { createPuckApiRoutesVersions } from './createPuckApiRoutesVersions.js';
export { mapRootPropsToPayloadFields, mapPayloadFieldsToRootProps, DEFAULT_ROOT_PROPS_MAPPINGS, setNestedValue, getNestedValue, mergeMappings, deepMerge, } from './utils/mapRootProps.js';
export type { AuthenticatedUser, AuthResult, PermissionResult, PuckApiAuthHooks, RootPropsMapping, PuckApiRoutesConfig, ErrorContext, RouteHandler, RouteHandlerWithId, RouteHandlerContext, RouteHandlerWithIdContext, PuckApiRouteHandlers, PuckApiRouteWithIdHandlers, CreatePageBody, UpdatePageBody, ApiResponse, PageVersion, PuckApiVersionsRouteHandlers, } from './types.js';
