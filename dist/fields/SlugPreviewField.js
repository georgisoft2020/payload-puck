'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * SlugPreviewField - Custom Puck field for displaying the computed slug
 *
 * Read-only field that shows the auto-generated URL slug.
 * When page-tree is enabled, slug = folderPath + '/' + pageSegment
 */ import React from 'react';
import { Link, Lock } from 'lucide-react';
// =============================================================================
// SlugPreviewField Component
// =============================================================================
export function SlugPreviewField({ value, label = 'URL Slug', hint = 'Auto-generated from folder + page segment' }) {
    const displayValue = value ? value.startsWith('/') ? value : `/${value}` : '/';
    return /*#__PURE__*/ _jsxs("div", {
        className: "puck-field",
        children: [
            /*#__PURE__*/ _jsxs("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                },
                children: [
                    /*#__PURE__*/ _jsx("label", {
                        style: {
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--puck-color-grey-04)'
                        },
                        children: label
                    }),
                    /*#__PURE__*/ _jsx(Lock, {
                        size: 14,
                        style: {
                            color: 'var(--puck-color-grey-06)'
                        }
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'var(--puck-color-grey-11)',
                    border: '1px solid var(--puck-color-grey-09)',
                    borderRadius: '6px'
                },
                children: [
                    /*#__PURE__*/ _jsx(Link, {
                        size: 14,
                        style: {
                            marginRight: '8px',
                            color: 'var(--puck-color-grey-06)'
                        }
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        style: {
                            fontSize: '14px',
                            color: 'var(--puck-color-grey-05)',
                            fontFamily: 'var(--font-mono, monospace)',
                            wordBreak: 'break-all'
                        },
                        children: displayValue
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("p", {
                style: {
                    marginTop: '6px',
                    fontSize: '12px',
                    color: 'var(--puck-color-grey-06)'
                },
                children: hint
            })
        ]
    });
}
// =============================================================================
// Field Configuration Factory
// =============================================================================
/**
 * Creates a Puck field configuration for slug preview
 */ export function createSlugPreviewField(config) {
    return {
        type: 'custom',
        label: config?.label ?? 'URL Slug',
        render: ({ value })=>/*#__PURE__*/ _jsx(SlugPreviewField, {
                value: value || '',
                label: config?.label,
                hint: config?.hint
            })
    };
}
