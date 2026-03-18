/**
 * createRichTextField - Factory for enhanced Puck richtext fields
 *
 * Creates a Puck native richtext field with additional features:
 * - Text color with opacity (RGBA)
 * - Highlight with multicolor support
 * - Font size (9 presets + custom)
 * - Superscript and subscript
 * - Theme color presets integration
 *
 * Uses Puck's official extension points (tiptap.extensions, tiptap.selector, renderMenu)
 * for native integration with contentEditable support.
 */
import React from 'react';
export interface CreateRichTextFieldOptions {
    /** Field label shown in sidebar */
    label?: string;
    /**
     * Enable inline editing on canvas.
     * When true, users can edit text directly in the preview.
     * @default false
     */
    contentEditable?: boolean;
    /**
     * Initial height for sidebar editor (ignored if contentEditable is true)
     * @default 192
     */
    initialHeight?: number | string;
    /**
     * Heading levels to allow
     * @default [1, 2, 3, 4, 5, 6]
     */
    headingLevels?: (1 | 2 | 3 | 4 | 5 | 6)[];
    /**
     * Enable font size control
     * @default true
     */
    fontSize?: boolean;
    /**
     * Enable text color control
     * @default true
     */
    textColor?: boolean;
    /**
     * Enable highlight control
     * @default true
     */
    highlight?: boolean;
    /**
     * Enable superscript
     * @default true
     */
    superscript?: boolean;
    /**
     * Enable subscript
     * @default true
     */
    subscript?: boolean;
    /**
     * Enable code blocks (in addition to inline code)
     * @default true
     */
    codeBlock?: boolean;
    /**
     * Enable blockquotes
     * @default true
     */
    blockquote?: boolean;
}
/**
 * Creates a Puck richtext field with enhanced features.
 *
 * @example
 * ```tsx
 * const myConfig: ComponentConfig = {
 *   fields: {
 *     content: createRichTextField({
 *       label: 'Content',
 *       contentEditable: true,
 *     }),
 *   },
 *   // ...
 * }
 * ```
 */
export declare function createRichTextField(options?: CreateRichTextFieldOptions): {
    type: "richtext";
    label: string | undefined;
    contentEditable: boolean;
    initialHeight: string | number;
    options: {
        heading: {
            levels: (1 | 2 | 4 | 3 | 5 | 6)[];
        };
        codeBlock: false | undefined;
        blockquote: false | undefined;
    };
    tiptap: {
        extensions: any[];
        selector: any;
    };
    renderMenu: ({ editor, editorState }: {
        editor: any;
        editorState: any;
    }) => React.JSX.Element | null;
};
/**
 * Full-featured richtext field with all enhancements
 */
export declare const fullRichTextField: {
    type: "richtext";
    label: string | undefined;
    contentEditable: boolean;
    initialHeight: string | number;
    options: {
        heading: {
            levels: (1 | 2 | 4 | 3 | 5 | 6)[];
        };
        codeBlock: false | undefined;
        blockquote: false | undefined;
    };
    tiptap: {
        extensions: any[];
        selector: any;
    };
    renderMenu: ({ editor, editorState }: {
        editor: any;
        editorState: any;
    }) => React.JSX.Element | null;
};
/**
 * Minimal richtext field - structure only, no styling controls
 */
export declare const minimalRichTextField: {
    type: "richtext";
    label: string | undefined;
    contentEditable: boolean;
    initialHeight: string | number;
    options: {
        heading: {
            levels: (1 | 2 | 4 | 3 | 5 | 6)[];
        };
        codeBlock: false | undefined;
        blockquote: false | undefined;
    };
    tiptap: {
        extensions: any[];
        selector: any;
    };
    renderMenu: ({ editor, editorState }: {
        editor: any;
        editorState: any;
    }) => React.JSX.Element | null;
};
/**
 * Sidebar-only richtext field (no inline editing)
 */
export declare const sidebarRichTextField: {
    type: "richtext";
    label: string | undefined;
    contentEditable: boolean;
    initialHeight: string | number;
    options: {
        heading: {
            levels: (1 | 2 | 4 | 3 | 5 | 6)[];
        };
        codeBlock: false | undefined;
        blockquote: false | undefined;
    };
    tiptap: {
        extensions: any[];
        selector: any;
    };
    renderMenu: ({ editor, editorState }: {
        editor: any;
        editorState: any;
    }) => React.JSX.Element | null;
};
