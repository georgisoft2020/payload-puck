import { EmailColumnsConfig } from './EmailColumns.server.js';
export const EmailColumnsEditorConfig = {
    ...EmailColumnsConfig,
    fields: {
        ...EmailColumnsConfig.fields,
        columnCount: {
            type: 'radio',
            label: 'Columns',
            options: [
                {
                    label: '2',
                    value: 2
                },
                {
                    label: '3',
                    value: 3
                }
            ]
        },
        gap: {
            type: 'number',
            label: 'Gap (px)',
            min: 0,
            max: 48
        },
        verticalAlign: {
            type: 'radio',
            label: 'Vertical Align',
            options: [
                {
                    label: 'Top',
                    value: 'top'
                },
                {
                    label: 'Middle',
                    value: 'middle'
                },
                {
                    label: 'Bottom',
                    value: 'bottom'
                }
            ]
        }
    }
};
