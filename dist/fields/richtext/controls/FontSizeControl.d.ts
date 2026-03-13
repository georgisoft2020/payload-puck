/**
 * FontSizeControl - Font size control for Puck RichText toolbar
 *
 * A dropdown with:
 * - 9 preset sizes (XS to 4XL)
 * - Custom size input with px/rem/em unit selection
 */
import React from 'react';
import type { Editor } from '@tiptap/react';
interface FontSizeControlProps {
    editor: Editor;
    currentSize: string | undefined;
}
export declare function FontSizeControl({ editor, currentSize }: FontSizeControlProps): React.JSX.Element;
export {};
