import { EmailWrapperConfig } from './EmailWrapper.server.js';
import { createColorPickerField } from '../../../fields/ColorPickerField.js';
export const EmailWrapperEditorConfig = {
    ...EmailWrapperConfig,
    fields: {
        ...EmailWrapperConfig.fields,
        backgroundColor: createColorPickerField({
            label: 'Background Color'
        }),
        backgroundImage: {
            type: 'text',
            label: 'Background Image URL'
        },
        maxWidth: {
            type: 'number',
            label: 'Max Width (px)',
            min: 200,
            max: 900
        }
    }
};
