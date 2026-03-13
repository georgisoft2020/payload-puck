'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
 */ import React from 'react';
import { RichTextMenu } from '@puckeditor/core';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import HighlightExtension from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { Superscript as SuperscriptIcon, Subscript as SubscriptIcon } from 'lucide-react';
import { FontSize } from './extensions/FontSize.js';
import { ColorPickerControl } from './controls/ColorPickerControl.js';
import { FontSizeControl } from './controls/FontSizeControl.js';
import { HighlightControl } from './controls/HighlightControl.js';
// =============================================================================
// Factory Function
// =============================================================================
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
 */ export function createRichTextField(options = {}) {
    const { label, contentEditable = false, initialHeight = 192, headingLevels = [
        1,
        2,
        3,
        4,
        5,
        6
    ], fontSize = true, textColor = true, highlight = true, superscript = true, subscript = true, codeBlock = true, blockquote = true } = options;
    // Build custom TipTap extensions array
    // Using any[] to avoid complex union types with TipTap extensions
    const customExtensions = [
        TextStyle
    ];
    if (textColor) {
        customExtensions.push(Color);
    }
    if (highlight) {
        customExtensions.push(HighlightExtension.configure({
            multicolor: true
        }));
    }
    if (fontSize) {
        customExtensions.push(FontSize);
    }
    if (superscript) {
        customExtensions.push(Superscript);
    }
    if (subscript) {
        customExtensions.push(Subscript);
    }
    return {
        type: 'richtext',
        label,
        // Puck richtext options
        contentEditable,
        initialHeight,
        // Configure built-in extensions
        // Note: Puck expects `false` to disable or config object to customize
        // Omitting a key or setting to `undefined` means "use default" (enabled)
        options: {
            heading: {
                levels: headingLevels
            },
            codeBlock: codeBlock ? undefined : false,
            blockquote: blockquote ? undefined : false
        },
        // Add our custom TipTap extensions
        tiptap: {
            extensions: customExtensions,
            // Expose custom state for our controls
            // Cast to any because Puck's types expect Record<string, boolean> but we need strings for colors/sizes
            selector: (ctx)=>{
                if (!ctx.editor) {
                    return {};
                }
                return {
                    // Text color state
                    currentColor: ctx.editor.getAttributes('textStyle').color,
                    // Highlight state
                    highlightColor: ctx.editor.getAttributes('highlight').color,
                    isHighlight: ctx.editor.isActive('highlight'),
                    // Font size state
                    currentFontSize: ctx.editor.getAttributes('textStyle').fontSize,
                    // Superscript/Subscript state
                    isSuperscript: ctx.editor.isActive('superscript'),
                    isSubscript: ctx.editor.isActive('subscript'),
                    canSuperscript: ctx.editor.can().toggleSuperscript(),
                    canSubscript: ctx.editor.can().toggleSubscript()
                };
            }
        },
        // Custom menu with our additional controls
        // Using any types for Puck compatibility - our selector adds custom properties to editorState
        renderMenu: ({ editor, editorState })=>{
            // Guard against null editor/state during initialization
            if (!editor || !editorState) {
                return null;
            }
            return /*#__PURE__*/ _jsxs(RichTextMenu, {
                children: [
                    /*#__PURE__*/ _jsxs(RichTextMenu.Group, {
                        children: [
                            /*#__PURE__*/ _jsx(RichTextMenu.Bold, {}),
                            /*#__PURE__*/ _jsx(RichTextMenu.Italic, {}),
                            /*#__PURE__*/ _jsx(RichTextMenu.Underline, {}),
                            /*#__PURE__*/ _jsx(RichTextMenu.Strikethrough, {}),
                            superscript && /*#__PURE__*/ _jsx(RichTextMenu.Control, {
                                icon: /*#__PURE__*/ _jsx(SuperscriptIcon, {
                                    size: 16
                                }),
                                title: "Superscript",
                                active: editorState.isSuperscript,
                                disabled: !editorState.canSuperscript,
                                onClick: ()=>editor.chain().focus().toggleSuperscript().run()
                            }),
                            subscript && /*#__PURE__*/ _jsx(RichTextMenu.Control, {
                                icon: /*#__PURE__*/ _jsx(SubscriptIcon, {
                                    size: 16
                                }),
                                title: "Subscript",
                                active: editorState.isSubscript,
                                disabled: !editorState.canSubscript,
                                onClick: ()=>editor.chain().focus().toggleSubscript().run()
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(RichTextMenu.Group, {
                        children: [
                            /*#__PURE__*/ _jsx(RichTextMenu.HeadingSelect, {}),
                            /*#__PURE__*/ _jsx(RichTextMenu.ListSelect, {}),
                            /*#__PURE__*/ _jsx(RichTextMenu.AlignSelect, {})
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(RichTextMenu.Group, {
                        children: [
                            fontSize && /*#__PURE__*/ _jsx(FontSizeControl, {
                                editor: editor,
                                currentSize: editorState.currentFontSize
                            }),
                            textColor && /*#__PURE__*/ _jsx(ColorPickerControl, {
                                editor: editor,
                                currentColor: editorState.currentColor
                            }),
                            highlight && /*#__PURE__*/ _jsx(HighlightControl, {
                                editor: editor,
                                currentColor: editorState.highlightColor,
                                isActive: editorState.isHighlight
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(RichTextMenu.Group, {
                        children: [
                            blockquote && /*#__PURE__*/ _jsx(RichTextMenu.Blockquote, {}),
                            codeBlock && /*#__PURE__*/ _jsx(RichTextMenu.CodeBlock, {}),
                            /*#__PURE__*/ _jsx(RichTextMenu.HorizontalRule, {})
                        ]
                    })
                ]
            });
        }
    };
}
// =============================================================================
// Preset Configurations
// =============================================================================
/**
 * Full-featured richtext field with all enhancements
 */ export const fullRichTextField = createRichTextField({
    contentEditable: true,
    fontSize: true,
    textColor: true,
    highlight: true,
    superscript: true,
    subscript: true
});
/**
 * Minimal richtext field - structure only, no styling controls
 */ export const minimalRichTextField = createRichTextField({
    contentEditable: true,
    fontSize: false,
    textColor: false,
    highlight: false,
    superscript: false,
    subscript: false,
    headingLevels: [
        1,
        2,
        3
    ]
});
/**
 * Sidebar-only richtext field (no inline editing)
 */ export const sidebarRichTextField = createRichTextField({
    contentEditable: false,
    initialHeight: 300,
    fontSize: true,
    textColor: true,
    highlight: true
});
