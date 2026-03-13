'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * TransformField - Custom Puck field for CSS transforms
 *
 * This component provides:
 * - Live preview of transform effect
 * - Rotate slider (-360 to 360)
 * - Scale X/Y with link/unlink toggle
 * - Skew X/Y sliders
 * - Translate X/Y inputs with unit selector
 * - Transform origin 3x3 grid selector
 * - Collapsible 3D section (perspective, rotateX, rotateY)
 */ import React, { useCallback, memo, useState } from 'react';
import { Link, Unlink, RotateCw, Maximize2, X, ChevronDown, ChevronRight, Box } from 'lucide-react';
import { DEFAULT_TRANSFORM, transformValueToCSS } from './shared.js';
// =============================================================================
// Styles
// =============================================================================
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--theme-elevation-800)'
    },
    clearButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        padding: 0,
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        color: 'var(--theme-elevation-500)',
        cursor: 'pointer'
    },
    preview: {
        height: '96px',
        backgroundColor: 'var(--theme-elevation-50)',
        borderRadius: '6px',
        border: '1px solid var(--theme-elevation-150)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    previewBox: {
        width: '48px',
        height: '48px',
        backgroundColor: 'var(--theme-elevation-800)',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--theme-bg)',
        fontSize: '12px',
        fontWeight: 500,
        transition: 'transform 0.2s'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '12px',
        backgroundColor: 'var(--theme-elevation-50)',
        borderRadius: '6px'
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    sectionLabel: {
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--theme-elevation-700)'
    },
    linkButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        padding: 0,
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '4px',
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-elevation-700)',
        cursor: 'pointer'
    },
    linkButtonActive: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        padding: 0,
        border: '1px solid var(--theme-elevation-800)',
        borderRadius: '4px',
        backgroundColor: 'var(--theme-elevation-800)',
        color: 'var(--theme-bg)',
        cursor: 'pointer'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
    },
    sliderGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    sliderHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sliderLabel: {
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--theme-elevation-500)'
    },
    sliderValue: {
        fontSize: '12px',
        fontFamily: 'monospace',
        color: 'var(--theme-elevation-500)'
    },
    slider: {
        width: '100%',
        height: '6px',
        accentColor: 'var(--theme-elevation-800)',
        cursor: 'pointer'
    },
    translateRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
    },
    select: {
        height: '28px',
        width: '64px',
        padding: '0 8px',
        fontSize: '12px',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '4px',
        backgroundColor: 'var(--theme-input-bg)',
        color: 'var(--theme-elevation-800)',
        cursor: 'pointer'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    inputLabel: {
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--theme-elevation-500)'
    },
    input: {
        height: '32px',
        padding: '0 8px',
        fontSize: '14px',
        fontFamily: 'monospace',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '4px',
        backgroundColor: 'var(--theme-input-bg)',
        color: 'var(--theme-elevation-800)'
    },
    originGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4px',
        width: 'fit-content'
    },
    originButton: {
        width: '24px',
        height: '24px',
        padding: 0,
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '4px',
        backgroundColor: 'var(--theme-elevation-50)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    originButtonActive: {
        width: '24px',
        height: '24px',
        padding: 0,
        border: '1px solid var(--theme-elevation-800)',
        borderRadius: '4px',
        backgroundColor: 'var(--theme-elevation-800)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    originDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'var(--theme-elevation-400)'
    },
    originDotActive: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'var(--theme-bg)'
    },
    originRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    originLabel: {
        fontSize: '12px',
        color: 'var(--theme-elevation-500)',
        textTransform: 'capitalize'
    },
    collapsible: {
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '6px',
        overflow: 'hidden'
    },
    collapsibleHeader: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        border: 'none',
        backgroundColor: 'var(--theme-elevation-50)',
        cursor: 'pointer'
    },
    collapsibleTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    collapsibleContent: {
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        borderTop: '1px solid var(--theme-elevation-150)'
    },
    checkboxRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    checkbox: {
        width: '16px',
        height: '16px',
        accentColor: 'var(--theme-elevation-800)',
        cursor: 'pointer'
    },
    checkboxLabel: {
        fontSize: '12px',
        color: 'var(--theme-elevation-500)',
        cursor: 'pointer'
    }
};
const ORIGIN_POSITIONS = [
    'top-left',
    'top',
    'top-right',
    'left',
    'center',
    'right',
    'bottom-left',
    'bottom',
    'bottom-right'
];
function OriginGrid({ value, onChange, disabled }) {
    return /*#__PURE__*/ _jsx("div", {
        style: styles.originGrid,
        children: ORIGIN_POSITIONS.map((origin)=>{
            const isActive = value === origin;
            return /*#__PURE__*/ _jsx("button", {
                type: "button",
                onClick: ()=>onChange(origin),
                disabled: disabled,
                style: {
                    ...isActive ? styles.originButtonActive : styles.originButton,
                    ...disabled ? {
                        opacity: 0.5,
                        cursor: 'not-allowed'
                    } : {}
                },
                title: origin.replace('-', ' '),
                children: /*#__PURE__*/ _jsx("span", {
                    style: isActive ? styles.originDotActive : styles.originDot
                })
            }, origin);
        })
    });
}
function SliderInput({ value, onChange, min, max, step = 1, disabled, label, unit = '' }) {
    return /*#__PURE__*/ _jsxs("div", {
        style: styles.sliderGroup,
        children: [
            label && /*#__PURE__*/ _jsxs("div", {
                style: styles.sliderHeader,
                children: [
                    /*#__PURE__*/ _jsx("label", {
                        style: styles.sliderLabel,
                        children: label
                    }),
                    /*#__PURE__*/ _jsxs("span", {
                        style: styles.sliderValue,
                        children: [
                            value,
                            unit
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("input", {
                type: "range",
                min: min,
                max: max,
                step: step,
                value: value,
                onChange: (e)=>onChange(Number(e.target.value)),
                disabled: disabled,
                style: {
                    ...styles.slider,
                    ...disabled ? {
                        opacity: 0.5,
                        cursor: 'not-allowed'
                    } : {}
                }
            })
        ]
    });
}
// =============================================================================
// TransformField Component
// =============================================================================
function TransformFieldInner({ value, onChange, label, readOnly }) {
    const [show3D, setShow3D] = useState(value?.enable3D ?? false);
    // Use default if no value
    const currentValue = value || DEFAULT_TRANSFORM;
    // Handle individual value changes
    const handleChange = useCallback((key, newValue)=>{
        onChange({
            ...currentValue,
            [key]: newValue
        });
    }, [
        currentValue,
        onChange
    ]);
    // Handle scale change with locking
    const handleScaleChange = useCallback((axis, newValue)=>{
        if (currentValue.scaleLocked) {
            onChange({
                ...currentValue,
                scaleX: newValue,
                scaleY: newValue
            });
        } else {
            onChange({
                ...currentValue,
                [axis]: newValue
            });
        }
    }, [
        currentValue,
        onChange
    ]);
    // Handle scale lock toggle
    const handleScaleLockToggle = useCallback(()=>{
        if (!currentValue.scaleLocked) {
            // When locking, sync both to X value
            onChange({
                ...currentValue,
                scaleLocked: true,
                scaleY: currentValue.scaleX
            });
        } else {
            onChange({
                ...currentValue,
                scaleLocked: false
            });
        }
    }, [
        currentValue,
        onChange
    ]);
    // Handle 3D toggle
    const handle3DToggle = useCallback((enabled)=>{
        setShow3D(enabled);
        onChange({
            ...currentValue,
            enable3D: enabled
        });
    }, [
        currentValue,
        onChange
    ]);
    // Handle clear
    const handleClear = useCallback(()=>{
        onChange(null);
    }, [
        onChange
    ]);
    // Get preview styles
    const previewStyles = transformValueToCSS(currentValue) || {};
    return /*#__PURE__*/ _jsxs("div", {
        className: "puck-field",
        style: styles.container,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                style: styles.header,
                children: [
                    label && /*#__PURE__*/ _jsx("label", {
                        style: styles.label,
                        children: label
                    }),
                    value && !readOnly && /*#__PURE__*/ _jsx("button", {
                        type: "button",
                        onClick: handleClear,
                        style: styles.clearButton,
                        title: "Reset transform",
                        children: /*#__PURE__*/ _jsx(X, {
                            style: {
                                width: '16px',
                                height: '16px'
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                style: styles.preview,
                children: /*#__PURE__*/ _jsx("div", {
                    style: {
                        ...styles.previewBox,
                        ...previewStyles
                    },
                    children: "Aa"
                })
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: styles.section,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        style: styles.sectionTitle,
                        children: [
                            /*#__PURE__*/ _jsx(RotateCw, {
                                style: {
                                    width: '16px',
                                    height: '16px',
                                    color: 'var(--theme-elevation-500)'
                                }
                            }),
                            /*#__PURE__*/ _jsx("label", {
                                style: styles.sectionLabel,
                                children: "Rotate"
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx(SliderInput, {
                        value: currentValue.rotate,
                        onChange: (v)=>handleChange('rotate', v),
                        min: -360,
                        max: 360,
                        disabled: readOnly,
                        unit: "deg"
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: styles.section,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        style: styles.sectionHeader,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                style: styles.sectionTitle,
                                children: [
                                    /*#__PURE__*/ _jsx(Maximize2, {
                                        style: {
                                            width: '16px',
                                            height: '16px',
                                            color: 'var(--theme-elevation-500)'
                                        }
                                    }),
                                    /*#__PURE__*/ _jsx("label", {
                                        style: styles.sectionLabel,
                                        children: "Scale"
                                    })
                                ]
                            }),
                            !readOnly && /*#__PURE__*/ _jsx("button", {
                                type: "button",
                                onClick: handleScaleLockToggle,
                                style: currentValue.scaleLocked ? styles.linkButtonActive : styles.linkButton,
                                title: currentValue.scaleLocked ? 'Click to unlink X and Y scale' : 'Click to link X and Y scale',
                                children: currentValue.scaleLocked ? /*#__PURE__*/ _jsx(Link, {
                                    style: {
                                        width: '12px',
                                        height: '12px'
                                    }
                                }) : /*#__PURE__*/ _jsx(Unlink, {
                                    style: {
                                        width: '12px',
                                        height: '12px'
                                    }
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        style: currentValue.scaleLocked ? {} : styles.grid,
                        children: [
                            /*#__PURE__*/ _jsx(SliderInput, {
                                label: currentValue.scaleLocked ? 'Scale' : 'Scale X',
                                value: currentValue.scaleX,
                                onChange: (v)=>handleScaleChange('scaleX', v),
                                min: 0.1,
                                max: 3,
                                step: 0.1,
                                disabled: readOnly
                            }),
                            !currentValue.scaleLocked && /*#__PURE__*/ _jsx(SliderInput, {
                                label: "Scale Y",
                                value: currentValue.scaleY,
                                onChange: (v)=>handleScaleChange('scaleY', v),
                                min: 0.1,
                                max: 3,
                                step: 0.1,
                                disabled: readOnly
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: styles.section,
                children: [
                    /*#__PURE__*/ _jsx("label", {
                        style: styles.sectionLabel,
                        children: "Skew"
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        style: styles.grid,
                        children: [
                            /*#__PURE__*/ _jsx(SliderInput, {
                                label: "Skew X",
                                value: currentValue.skewX,
                                onChange: (v)=>handleChange('skewX', v),
                                min: -45,
                                max: 45,
                                disabled: readOnly,
                                unit: "deg"
                            }),
                            /*#__PURE__*/ _jsx(SliderInput, {
                                label: "Skew Y",
                                value: currentValue.skewY,
                                onChange: (v)=>handleChange('skewY', v),
                                min: -45,
                                max: 45,
                                disabled: readOnly,
                                unit: "deg"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: styles.section,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        style: styles.translateRow,
                        children: [
                            /*#__PURE__*/ _jsx("label", {
                                style: styles.sectionLabel,
                                children: "Translate"
                            }),
                            /*#__PURE__*/ _jsxs("select", {
                                value: currentValue.translateUnit,
                                onChange: (e)=>handleChange('translateUnit', e.target.value),
                                disabled: readOnly,
                                style: styles.select,
                                children: [
                                    /*#__PURE__*/ _jsx("option", {
                                        value: "px",
                                        children: "px"
                                    }),
                                    /*#__PURE__*/ _jsx("option", {
                                        value: "rem",
                                        children: "rem"
                                    }),
                                    /*#__PURE__*/ _jsx("option", {
                                        value: "%",
                                        children: "%"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        style: styles.grid,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                style: styles.inputGroup,
                                children: [
                                    /*#__PURE__*/ _jsx("label", {
                                        style: styles.inputLabel,
                                        children: "X"
                                    }),
                                    /*#__PURE__*/ _jsx("input", {
                                        type: "number",
                                        value: currentValue.translateX,
                                        onChange: (e)=>handleChange('translateX', parseFloat(e.target.value) || 0),
                                        disabled: readOnly,
                                        style: styles.input
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                style: styles.inputGroup,
                                children: [
                                    /*#__PURE__*/ _jsx("label", {
                                        style: styles.inputLabel,
                                        children: "Y"
                                    }),
                                    /*#__PURE__*/ _jsx("input", {
                                        type: "number",
                                        value: currentValue.translateY,
                                        onChange: (e)=>handleChange('translateY', parseFloat(e.target.value) || 0),
                                        disabled: readOnly,
                                        style: styles.input
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: styles.section,
                children: [
                    /*#__PURE__*/ _jsx("label", {
                        style: styles.sectionLabel,
                        children: "Transform Origin"
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        style: styles.originRow,
                        children: [
                            /*#__PURE__*/ _jsx(OriginGrid, {
                                value: currentValue.origin,
                                onChange: (v)=>handleChange('origin', v),
                                disabled: readOnly
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                style: styles.originLabel,
                                children: currentValue.origin.replace('-', ' ')
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: styles.collapsible,
                children: [
                    /*#__PURE__*/ _jsxs("button", {
                        type: "button",
                        onClick: ()=>setShow3D(!show3D),
                        style: styles.collapsibleHeader,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                style: styles.collapsibleTitle,
                                children: [
                                    /*#__PURE__*/ _jsx(Box, {
                                        style: {
                                            width: '16px',
                                            height: '16px',
                                            color: 'var(--theme-elevation-500)'
                                        }
                                    }),
                                    /*#__PURE__*/ _jsx("label", {
                                        style: styles.sectionLabel,
                                        children: "3D Transforms"
                                    })
                                ]
                            }),
                            show3D ? /*#__PURE__*/ _jsx(ChevronDown, {
                                style: {
                                    width: '16px',
                                    height: '16px',
                                    color: 'var(--theme-elevation-500)'
                                }
                            }) : /*#__PURE__*/ _jsx(ChevronRight, {
                                style: {
                                    width: '16px',
                                    height: '16px',
                                    color: 'var(--theme-elevation-500)'
                                }
                            })
                        ]
                    }),
                    show3D && /*#__PURE__*/ _jsxs("div", {
                        style: styles.collapsibleContent,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                style: styles.checkboxRow,
                                children: [
                                    /*#__PURE__*/ _jsx("input", {
                                        type: "checkbox",
                                        id: "enable3d",
                                        checked: currentValue.enable3D,
                                        onChange: (e)=>handle3DToggle(e.target.checked),
                                        disabled: readOnly,
                                        style: styles.checkbox
                                    }),
                                    /*#__PURE__*/ _jsx("label", {
                                        htmlFor: "enable3d",
                                        style: styles.checkboxLabel,
                                        children: "Enable 3D Transforms"
                                    })
                                ]
                            }),
                            currentValue.enable3D && /*#__PURE__*/ _jsxs(_Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        style: styles.inputGroup,
                                        children: [
                                            /*#__PURE__*/ _jsx("label", {
                                                style: styles.inputLabel,
                                                children: "Perspective (px)"
                                            }),
                                            /*#__PURE__*/ _jsx("input", {
                                                type: "number",
                                                min: 100,
                                                max: 2000,
                                                value: currentValue.perspective ?? 1000,
                                                onChange: (e)=>handleChange('perspective', parseInt(e.target.value, 10) || 1000),
                                                disabled: readOnly,
                                                style: styles.input
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        style: styles.grid,
                                        children: [
                                            /*#__PURE__*/ _jsx(SliderInput, {
                                                label: "Rotate X",
                                                value: currentValue.rotateX ?? 0,
                                                onChange: (v)=>handleChange('rotateX', v),
                                                min: -180,
                                                max: 180,
                                                disabled: readOnly,
                                                unit: "deg"
                                            }),
                                            /*#__PURE__*/ _jsx(SliderInput, {
                                                label: "Rotate Y",
                                                value: currentValue.rotateY ?? 0,
                                                onChange: (v)=>handleChange('rotateY', v),
                                                min: -180,
                                                max: 180,
                                                disabled: readOnly,
                                                unit: "deg"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
export const TransformField = /*#__PURE__*/ memo(TransformFieldInner);
// =============================================================================
// Field Configuration Factory
// =============================================================================
/**
 * Creates a Puck field configuration for CSS transforms
 */ export function createTransformField(config) {
    return {
        type: 'custom',
        label: config.label,
        render: ({ value, onChange, readOnly })=>/*#__PURE__*/ _jsx(TransformField, {
                value: value,
                onChange: onChange,
                label: config.label,
                readOnly: readOnly
            })
    };
}
