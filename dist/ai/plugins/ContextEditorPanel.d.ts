import type { ContextEditorPluginOptions } from '../types.js';
interface ContextEditorPanelProps extends ContextEditorPluginOptions {
}
/**
 * Panel component for managing AI context in the Puck editor sidebar
 */
export declare function ContextEditorPanel({ apiEndpoint, canEdit, canCreate, canDelete, }: ContextEditorPanelProps): import("react").JSX.Element;
export {};
