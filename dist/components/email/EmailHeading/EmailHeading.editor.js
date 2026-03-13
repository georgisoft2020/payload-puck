import { EmailHeadingConfig } from './EmailHeading.server.js';
import { createColorPickerField } from '../../../fields/ColorPickerField.js';
export const EmailHeadingEditorConfig = {
    ...EmailHeadingConfig,
    fields: {
        text: {
            type: 'text',
            label: 'Text'
        },
        level: {
            type: 'radio',
            label: 'Level',
            options: [
                {
                    label: 'H1',
                    value: 1
                },
                {
                    label: 'H2',
                    value: 2
                },
                {
                    label: 'H3',
                    value: 3
                }
            ]
        },
        color: createColorPickerField({
            label: 'Color'
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
        }
    }
};
