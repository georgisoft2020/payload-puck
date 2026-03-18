import { EmailSectionConfig } from './EmailSection.server.js';
import { createColorPickerField } from '../../../fields/ColorPickerField.js';
import { createPaddingField } from '../../../fields/PaddingField.js';
export const EmailSectionEditorConfig = {
    ...EmailSectionConfig,
    fields: {
        ...EmailSectionConfig.fields,
        backgroundColor: createColorPickerField({
            label: 'Background Color'
        }),
        padding: createPaddingField({
            label: 'Padding'
        }),
        maxWidth: {
            type: 'number',
            label: 'Max Width (px)',
            min: 200,
            max: 900
        }
    }
};
