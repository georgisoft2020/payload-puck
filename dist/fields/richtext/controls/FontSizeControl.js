'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * FontSizeControl - Font size control for Puck RichText toolbar
 *
 * A dropdown with:
 * - 9 preset sizes (XS to 4XL)
 * - Custom size input with px/rem/em unit selection
 */ import React, { useState, useCallback } from 'react';
import { ALargeSmall, ChevronDown } from 'lucide-react';
import { FONT_SIZES, FONT_SIZE_UNITS, controlStyles } from './shared.js';
import { Dropdown } from './DropdownPortal.js';
export function FontSizeControl({ editor, currentSize }) {
    const [isOpen, setIsOpen] = useState(false);
    const [customValue, setCustomValue] = useState('');
    const [customUnit, setCustomUnit] = useState('px');
    const handlePresetClick = useCallback((value)=>{
        if (value) {
            editor.chain().focus().setFontSize(value).run();
        } else {
            editor.chain().focus().unsetFontSize().run();
        }
        setIsOpen(false);
    }, [
        editor
    ]);
    const handleCustomApply = useCallback(()=>{
        if (customValue) {
            const size = `${customValue}${customUnit}`;
            editor.chain().focus().setFontSize(size).run();
            setIsOpen(false);
            setCustomValue('');
        }
    }, [
        editor,
        customValue,
        customUnit
    ]);
    const handleCustomKeyDown = useCallback((e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCustomApply();
        }
    }, [
        handleCustomApply
    ]);
    // Find current preset label if any
    const currentPreset = FONT_SIZES.find((s)=>s.value === currentSize);
    const hasCustomSize = currentSize && !currentPreset;
    const trigger = /*#__PURE__*/ _jsxs("button", {
        type: "button",
        title: "Font Size",
        style: {
            ...controlStyles.dropdownTrigger,
            ...currentSize ? controlStyles.dropdownTriggerActive : {}
        },
        children: [
            /*#__PURE__*/ _jsx(ALargeSmall, {
                style: controlStyles.icon
            }),
            /*#__PURE__*/ _jsx(ChevronDown, {
                style: {
                    width: '12px',
                    height: '12px'
                }
            })
        ]
    });
    return /*#__PURE__*/ _jsx("div", {
        style: {
            position: 'relative'
        },
        children: /*#__PURE__*/ _jsxs(Dropdown, {
            isOpen: isOpen,
            onOpenChange: setIsOpen,
            trigger: trigger,
            minWidth: 200,
            children: [
                /*#__PURE__*/ _jsx("div", {
                    style: controlStyles.dropdownLabel,
                    children: "Presets"
                }),
                /*#__PURE__*/ _jsx("div", {
                    style: controlStyles.fontSizeGrid,
                    children: FONT_SIZES.map((size)=>{
                        const isActive = size.value === currentSize || !size.value && !currentSize;
                        return /*#__PURE__*/ _jsx("button", {
                            type: "button",
                            onClick: ()=>handlePresetClick(size.value),
                            title: size.px,
                            style: {
                                ...controlStyles.fontSizeButton,
                                ...isActive ? controlStyles.fontSizeButtonActive : {}
                            },
                            children: size.label
                        }, size.label);
                    })
                }),
                /*#__PURE__*/ _jsxs("div", {
                    style: controlStyles.customSizeRow,
                    children: [
                        /*#__PURE__*/ _jsx("input", {
                            type: "number",
                            placeholder: "16",
                            min: "8",
                            max: "200",
                            value: customValue,
                            onChange: (e)=>setCustomValue(e.target.value),
                            onKeyDown: handleCustomKeyDown,
                            style: controlStyles.customSizeInput
                        }),
                        /*#__PURE__*/ _jsx("select", {
                            value: customUnit,
                            onChange: (e)=>setCustomUnit(e.target.value),
                            style: controlStyles.customSizeSelect,
                            children: FONT_SIZE_UNITS.map((unit)=>/*#__PURE__*/ _jsx("option", {
                                    value: unit,
                                    children: unit
                                }, unit))
                        }),
                        /*#__PURE__*/ _jsx("button", {
                            type: "button",
                            onClick: handleCustomApply,
                            style: controlStyles.customSizeApply,
                            children: "Apply"
                        })
                    ]
                }),
                hasCustomSize && /*#__PURE__*/ _jsxs("div", {
                    style: {
                        padding: '8px 12px',
                        fontSize: '12px',
                        color: 'var(--puck-color-grey-05)',
                        borderTop: '1px solid var(--puck-color-grey-03)'
                    },
                    children: [
                        "Current: ",
                        currentSize
                    ]
                })
            ]
        })
    });
}
