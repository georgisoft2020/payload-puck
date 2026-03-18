'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HighlightControl - Text highlight control for Puck RichText toolbar
 *
 * A dropdown color picker for text highlighting with:
 * - Native color input
 * - Hex input with validation
 * - Opacity slider (RGBA support)
 * - Theme color presets
 * - Remove highlight option
 */ import React, { useState, useCallback } from 'react';
import { Highlighter, ChevronDown } from 'lucide-react';
import { controlStyles } from './shared.js';
import { ColorPickerPanel } from './ColorPickerControl.js';
import { Dropdown } from './DropdownPortal.js';
export function HighlightControl({ editor, currentColor, isActive }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleColorChange = useCallback((color)=>{
        if (color) {
            editor.chain().focus().setHighlight({
                color
            }).run();
        } else {
            editor.chain().focus().unsetHighlight().run();
        }
    }, [
        editor
    ]);
    const close = useCallback(()=>setIsOpen(false), []);
    const trigger = /*#__PURE__*/ _jsxs("button", {
        type: "button",
        title: "Highlight",
        style: {
            ...controlStyles.dropdownTrigger,
            ...isActive ? controlStyles.dropdownTriggerActive : {}
        },
        children: [
            /*#__PURE__*/ _jsx(Highlighter, {
                style: controlStyles.icon
            }),
            /*#__PURE__*/ _jsx(ChevronDown, {
                style: {
                    width: '12px',
                    height: '12px'
                }
            }),
            currentColor && /*#__PURE__*/ _jsx("span", {
                style: {
                    position: 'absolute',
                    bottom: '2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '3px',
                    borderRadius: '1px',
                    backgroundColor: currentColor
                }
            })
        ]
    });
    return /*#__PURE__*/ _jsx("div", {
        style: {
            position: 'relative'
        },
        children: /*#__PURE__*/ _jsx(Dropdown, {
            isOpen: isOpen,
            onOpenChange: setIsOpen,
            trigger: trigger,
            minWidth: 260,
            children: /*#__PURE__*/ _jsx(ColorPickerPanel, {
                currentColor: currentColor,
                onColorChange: handleColorChange,
                onClose: close,
                mode: "highlight"
            })
        })
    });
}
