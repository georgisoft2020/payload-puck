import { EmailFooterConfig } from './EmailFooter.server.js';
export const EmailFooterEditorConfig = {
    ...EmailFooterConfig,
    fields: {
        companyName: {
            type: 'text',
            label: 'Company Name'
        },
        address: {
            type: 'textarea',
            label: 'Address'
        },
        unsubscribeText: {
            type: 'text',
            label: 'Unsubscribe Text'
        },
        unsubscribeUrl: {
            type: 'text',
            label: 'Unsubscribe URL'
        }
    }
};
