import { EmailDividerConfig } from './EmailDivider.server.js';
import { createColorPickerField } from '../../../fields/ColorPickerField.js';
export const EmailDividerEditorConfig = {
    ...EmailDividerConfig,
    fields: {
        color: createColorPickerField({
            label: 'Color'
        }),
        thickness: {
            type: 'number',
            label: 'Thickness (px)',
            min: 1,
            max: 10
        },
        width: {
            type: 'select',
            label: 'Width',
            options: [
                {
                    label: '100%',
                    value: '100%'
                },
                {
                    label: '80%',
                    value: '80%'
                },
                {
                    label: '60%',
                    value: '60%'
                },
                {
                    label: '40%',
                    value: '40%'
                }
            ]
        }
    }
};
