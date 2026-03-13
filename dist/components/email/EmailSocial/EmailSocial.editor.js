import { EmailSocialConfig } from './EmailSocial.server.js';
export const EmailSocialEditorConfig = {
    ...EmailSocialConfig,
    fields: {
        links: {
            type: 'array',
            label: 'Social Links',
            arrayFields: {
                platform: {
                    type: 'select',
                    label: 'Platform',
                    options: [
                        {
                            label: 'Facebook',
                            value: 'facebook'
                        },
                        {
                            label: 'X (Twitter)',
                            value: 'x'
                        },
                        {
                            label: 'Instagram',
                            value: 'instagram'
                        },
                        {
                            label: 'LinkedIn',
                            value: 'linkedin'
                        },
                        {
                            label: 'YouTube',
                            value: 'youtube'
                        }
                    ]
                },
                url: {
                    type: 'text',
                    label: 'URL'
                }
            },
            defaultItemProps: {
                platform: 'facebook',
                url: '#'
            }
        },
        iconSize: {
            type: 'number',
            label: 'Icon Size (px)',
            min: 20,
            max: 64
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
        }
    }
};
