import type { PromptEditorPluginOptions } from '../types.js';
interface PromptEditorPanelProps extends PromptEditorPluginOptions {
}
/**
 * Panel component for managing AI prompts in the Puck editor sidebar
 */
export declare function PromptEditorPanel({ apiEndpoint, canEdit, canCreate, canDelete, }: PromptEditorPanelProps): import("react").JSX.Element;
export {};
