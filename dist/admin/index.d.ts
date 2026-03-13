/**
 * @delmaredigital/payload-puck/admin
 *
 * Admin utilities and types for Payload CMS integration.
 *
 * NOTE: For the edit button components, import from '/admin/client':
 * ```ts
 * import { EditWithPuckButton } from '@delmaredigital/payload-puck/admin/client'
 * ```
 *
 * For the PuckEditorView component, import from '/editor':
 * ```ts
 * import { PuckEditorView } from '@delmaredigital/payload-puck/editor'
 * ```
 */
export type { PuckEditorViewProps } from './PuckEditorView.js';
export type { EditWithPuckButtonProps } from './EditWithPuckButton.js';
export type { EditWithPuckCellConfig } from './EditWithPuckCell.js';
export type { AdminComponentsConfig } from './generateAdminComponents.js';
export { generatePuckEditField } from './generateAdminComponents.js';
