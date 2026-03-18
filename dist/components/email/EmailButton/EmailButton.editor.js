import { EmailButtonConfig } from './EmailButton.server.js';
import { createColorPickerField } from '../../../fields/ColorPickerField.js';
export const EmailButtonEditorConfig = {
    ...EmailButtonConfig,
    fields: {
        text: {
            type: 'text',
            label: 'Button Text'
        },
        href: {
            type: 'text',
            label: 'Link URL'
        },
        backgroundColor: createColorPickerField({
            label: 'Background Color'
        }),
        textColor: createColorPickerField({
            label: 'Text Color'
        }),
        borderRadius: {
            type: 'number',
            label: 'Border Radius (px)',
            min: 0,
            max: 50
        },
        padding: {
            type: 'select',
            label: 'Padding',
            options: [
                {
                    label: 'Small',
                    value: '8px 16px'
                },
                {
                    label: 'Medium',
                    value: '12px 24px'
                },
                {
                    label: 'Large',
                    value: '16px 32px'
                },
                {
                    label: 'Extra Large',
                    value: '20px 40px'
                }
            ]
        },
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
        fullWidth: {
            type: 'radio',
            label: 'Full Width',
            options: [
                {
                    label: 'No',
                    value: false
                },
                {
                    label: 'Yes',
                    value: true
                }
            ]
        }
    }
};
