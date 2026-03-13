'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createRichTextField } from '../../../fields/richtext/index.js';
import { createColorPickerField } from '../../../fields/ColorPickerField.js';
import { colorValueToEmailCSS } from '../../../fields/shared.js';
const defaultProps = {
    content: '<p>Enter your text here...</p>',
    fontSize: '16px',
    color: {
        hex: '#333333'
    },
    alignment: 'left',
    lineHeight: '1.5'
};
export const EmailTextEditorConfig = {
    label: 'Text',
    fields: {
        content: createRichTextField({
            label: 'Content',
            contentEditable: true
        }),
        fontSize: {
            type: 'select',
            label: 'Font Size',
            options: [
                {
                    label: 'Small (14px)',
                    value: '14px'
                },
                {
                    label: 'Normal (16px)',
                    value: '16px'
                },
                {
                    label: 'Large (18px)',
                    value: '18px'
                },
                {
                    label: 'Extra Large (20px)',
                    value: '20px'
                }
            ]
        },
        color: createColorPickerField({
            label: 'Text Color'
        }),
        alignment: {
            type: 'radio',
            label: 'Alignment',
            options: [
                {
                    label: 'Left',
                    value: 'left'
                },
                {
                    label: 'Center',
                    value: 'center'
                },
                {
                    label: 'Right',
                    value: 'right'
                }
            ]
        },
        lineHeight: {
            type: 'select',
            label: 'Line Height',
            options: [
                {
                    label: 'Tight (1.2)',
                    value: '1.2'
                },
                {
                    label: 'Normal (1.5)',
                    value: '1.5'
                },
                {
                    label: 'Relaxed (1.8)',
                    value: '1.8'
                },
                {
                    label: 'Loose (2.0)',
                    value: '2.0'
                }
            ]
        }
    },
    defaultProps,
    render: ({ content, fontSize, color, alignment, lineHeight })=>{
        const textColor = colorValueToEmailCSS(color) ?? '#333333';
        return /*#__PURE__*/ _jsx("div", {
            style: {
                fontSize,
                color: textColor,
                textAlign: alignment,
                lineHeight
            },
            children: content
        });
    }
};
