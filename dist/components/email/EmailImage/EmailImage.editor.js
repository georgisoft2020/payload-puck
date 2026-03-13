import { EmailImageConfig } from './EmailImage.server.js';
import { createMediaField } from '../../../fields/MediaField.js';
export const EmailImageEditorConfig = {
    ...EmailImageConfig,
    fields: {
        image: createMediaField({
            label: 'Image'
        }),
        alt: {
            type: 'text',
            label: 'Alt Text'
        },
        width: {
            type: 'number',
            label: 'Width (px)',
            min: 50,
            max: 900
        },
        height: {
            type: 'number',
            label: 'Height (px, optional)'
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
        link: {
            type: 'text',
            label: 'Link URL'
        }
    }
};
