/**
 * ColorPickerControl - Text color control for Puck RichText toolbar
 *
 * A dropdown color picker with:
 * - Native color input
 * - Hex input with validation
 * - Opacity slider (RGBA support)
 * - Theme color presets
 * - "Theme Color (Auto)" option for dark/light mode adaptation
 */
import React from 'react';
import type { Editor } from '@tiptap/react';
interface ColorPickerControlProps {
    editor: Editor;
    currentColor: string | undefined;
}
export declare function ColorPickerControl({ editor, currentColor }: ColorPickerControlProps): React.JSX.Element;
interface ColorPickerPanelProps {
    currentColor: string | undefined;
    onColorChange: (color: string | null) => void;
    onClose: () => void;
    mode: 'text' | 'highlight';
    showOpacity?: boolean;
}
export declare function ColorPickerPanel({ currentColor, onColorChange, onClose, mode, showOpacity, }: ColorPickerPanelProps): React.JSX.Element;
export {};
