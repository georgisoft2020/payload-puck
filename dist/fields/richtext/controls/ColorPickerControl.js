'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ColorPickerControl - Text color control for Puck RichText toolbar
 *
 * A dropdown color picker with:
 * - Native color input
 * - Hex input with validation
 * - Opacity slider (RGBA support)
 * - Theme color presets
 * - "Theme Color (Auto)" option for dark/light mode adaptation
 */ import React, { useState, useCallback } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { useTheme } from '../../../theme/index.js';
import { parseColor, normalizeHex, hexToRgba, controlStyles } from './shared.js';
import { Dropdown } from './DropdownPortal.js';
export function ColorPickerControl({ editor, currentColor }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleColorChange = useCallback((color)=>{
        if (color) {
            editor.chain().focus().setColor(color).run();
        } else {
            editor.chain().focus().unsetColor().run();
        }
    }, [
        editor
    ]);
    const close = useCallback(()=>setIsOpen(false), []);
    const hasColor = Boolean(currentColor);
    const trigger = /*#__PURE__*/ _jsxs("button", {
        type: "button",
        title: "Text Color",
        style: {
            ...controlStyles.dropdownTrigger,
            ...hasColor ? controlStyles.dropdownTriggerActive : {}
        },
        children: [
            /*#__PURE__*/ _jsx(Palette, {
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
                mode: "text"
            })
        })
    });
}
export function ColorPickerPanel({ currentColor, onColorChange, onClose, mode, showOpacity = true }) {
    const theme = useTheme();
    const presets = theme.colorPresets;
    const parsed = parseColor(currentColor);
    const [hex, setHex] = useState(parsed.hex);
    const [hexInput, setHexInput] = useState(parsed.hex);
    const [opacity, setOpacity] = useState(parsed.opacity);
    const [hoverTheme, setHoverTheme] = useState(false);
    // Apply color (converts to rgba if opacity < 100)
    const applyColor = useCallback((h, o)=>{
        if (o < 100) {
            onColorChange(hexToRgba(h, o));
        } else {
            onColorChange(h);
        }
    }, [
        onColorChange
    ]);
    const handleColorInputChange = useCallback((e)=>{
        const newHex = e.target.value;
        setHex(newHex);
        setHexInput(newHex);
        applyColor(newHex, opacity);
    }, [
        opacity,
        applyColor
    ]);
    const handleHexInputChange = useCallback((e)=>{
        const input = e.target.value;
        setHexInput(input);
        const normalized = normalizeHex(input);
        if (normalized) {
            setHex(normalized);
            applyColor(normalized, opacity);
        }
    }, [
        opacity,
        applyColor
    ]);
    const handleHexInputBlur = useCallback(()=>{
        setHexInput(hex);
    }, [
        hex
    ]);
    const handleOpacityChange = useCallback((e)=>{
        const newOpacity = parseInt(e.target.value, 10);
        setOpacity(newOpacity);
        applyColor(hex, newOpacity);
    }, [
        hex,
        applyColor
    ]);
    const handlePresetClick = useCallback((preset)=>{
        setHex(preset.hex);
        setHexInput(preset.hex);
        setOpacity(100);
        applyColor(preset.hex, 100);
        onClose();
    }, [
        applyColor,
        onClose
    ]);
    const handleClearColor = useCallback(()=>{
        onColorChange(null);
        onClose();
    }, [
        onColorChange,
        onClose
    ]);
    const previewColor = hexToRgba(hex, opacity);
    return /*#__PURE__*/ _jsxs("div", {
        style: controlStyles.colorPickerContainer,
        children: [
            /*#__PURE__*/ _jsxs("button", {
                type: "button",
                onClick: handleClearColor,
                onMouseEnter: ()=>setHoverTheme(true),
                onMouseLeave: ()=>setHoverTheme(false),
                style: {
                    ...controlStyles.colorPickerThemeButton,
                    ...hoverTheme ? {
                        backgroundColor: 'var(--puck-color-grey-01)'
                    } : {}
                },
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        style: controlStyles.colorPickerThemeSwatch
                    }),
                    mode === 'text' ? 'Theme Color (Auto)' : 'Remove Highlight'
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: controlStyles.colorPickerRow,
                children: [
                    /*#__PURE__*/ _jsx("input", {
                        type: "color",
                        value: hex,
                        onChange: handleColorInputChange,
                        style: controlStyles.colorPickerInput,
                        title: "Pick a color"
                    }),
                    /*#__PURE__*/ _jsx("input", {
                        type: "text",
                        value: hexInput,
                        onChange: handleHexInputChange,
                        onBlur: handleHexInputBlur,
                        placeholder: "#000000",
                        style: controlStyles.colorPickerHexInput
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        style: controlStyles.colorPickerPreview,
                        title: `${hex} at ${opacity}% opacity`,
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                style: controlStyles.colorPickerCheckerboard
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                style: {
                                    ...controlStyles.colorPickerOverlay,
                                    backgroundColor: previewColor
                                }
                            })
                        ]
                    })
                ]
            }),
            showOpacity && /*#__PURE__*/ _jsxs("div", {
                style: controlStyles.colorPickerOpacitySection,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        style: controlStyles.colorPickerOpacityHeader,
                        children: [
                            /*#__PURE__*/ _jsx("label", {
                                style: controlStyles.colorPickerOpacityLabel,
                                children: "Opacity"
                            }),
                            /*#__PURE__*/ _jsxs("span", {
                                style: controlStyles.colorPickerOpacityValue,
                                children: [
                                    opacity,
                                    "%"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        style: controlStyles.colorPickerOpacitySlider,
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                style: controlStyles.colorPickerCheckerboard
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                style: {
                                    ...controlStyles.colorPickerOverlay,
                                    background: `linear-gradient(to right, transparent 0%, ${hex} 100%)`
                                }
                            }),
                            /*#__PURE__*/ _jsx("input", {
                                type: "range",
                                min: "0",
                                max: "100",
                                value: opacity,
                                onChange: handleOpacityChange,
                                style: controlStyles.colorPickerOpacityInputRange
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                style: {
                                    ...controlStyles.colorPickerOpacityThumb,
                                    left: `calc(${opacity}% - 2px)`
                                }
                            })
                        ]
                    })
                ]
            }),
            presets.length > 0 && /*#__PURE__*/ _jsxs("div", {
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        style: controlStyles.colorPickerPresetsLabel,
                        children: "Presets"
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        style: controlStyles.colorPickerPresetsGrid,
                        children: presets.map((preset)=>{
                            const isSelected = hex.toLowerCase() === preset.hex.toLowerCase();
                            return /*#__PURE__*/ _jsx("button", {
                                type: "button",
                                onClick: ()=>handlePresetClick(preset),
                                style: {
                                    ...isSelected ? controlStyles.colorPickerPresetButtonSelected : controlStyles.colorPickerPresetButton,
                                    backgroundColor: preset.hex
                                },
                                title: preset.label
                            }, preset.hex);
                        })
                    })
                ]
            })
        ]
    });
}
