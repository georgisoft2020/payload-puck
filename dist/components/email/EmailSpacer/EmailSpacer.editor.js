import { EmailSpacerConfig } from './EmailSpacer.server.js';
export const EmailSpacerEditorConfig = {
    ...EmailSpacerConfig,
    fields: {
        height: {
            type: 'number',
            label: 'Height (px)',
            min: 1,
            max: 200
        }
    }
};
