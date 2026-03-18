/**
 * HighlightControl - Text highlight control for Puck RichText toolbar
 *
 * A dropdown color picker for text highlighting with:
 * - Native color input
 * - Hex input with validation
 * - Opacity slider (RGBA support)
 * - Theme color presets
 * - Remove highlight option
 */
import React from 'react';
import type { Editor } from '@tiptap/react';
interface HighlightControlProps {
    editor: Editor;
    currentColor: string | undefined;
    isActive: boolean;
}
export declare function HighlightControl({ editor, currentColor, isActive }: HighlightControlProps): React.JSX.Element;
export {};
