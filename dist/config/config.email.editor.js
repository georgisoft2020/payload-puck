'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createColorPickerField } from '../fields/ColorPickerField.js';
import { WEB_SAFE_FONTS } from '../components/email/utils.js';
// Layout
import { EmailWrapperEditorConfig } from '../components/email/EmailWrapper/EmailWrapper.editor.js';
import { EmailSectionEditorConfig } from '../components/email/EmailSection/EmailSection.editor.js';
import { EmailColumnsEditorConfig } from '../components/email/EmailColumns/EmailColumns.editor.js';
// Content
import { EmailTextEditorConfig } from '../components/email/EmailText/EmailText.editor.js';
import { EmailHeadingEditorConfig } from '../components/email/EmailHeading/EmailHeading.editor.js';
import { EmailImageEditorConfig } from '../components/email/EmailImage/EmailImage.editor.js';
import { EmailButtonEditorConfig } from '../components/email/EmailButton/EmailButton.editor.js';
// Utility
import { EmailSpacerEditorConfig } from '../components/email/EmailSpacer/EmailSpacer.editor.js';
import { EmailDividerEditorConfig } from '../components/email/EmailDivider/EmailDivider.editor.js';
// Prebuilt
import { EmailHeaderEditorConfig } from '../components/email/EmailHeader/EmailHeader.editor.js';
import { EmailFooterEditorConfig } from '../components/email/EmailFooter/EmailFooter.editor.js';
import { EmailSocialEditorConfig } from '../components/email/EmailSocial/EmailSocial.editor.js';
export const emailEditorConfig = {
    root: {
        fields: {
            subject: {
                type: 'text',
                label: 'Subject Line'
            },
            previewText: {
                type: 'textarea',
                label: 'Preview Text'
            },
            backgroundColor: createColorPickerField({
                label: 'Background Color'
            }),
            fontFamily: {
                type: 'select',
                label: 'Font Family',
                options: WEB_SAFE_FONTS.map(({ label, value })=>({
                        label,
                        value
                    }))
            },
            maxWidth: {
                type: 'number',
                label: 'Max Width (px)',
                min: 400,
                max: 900
            }
        },
        defaultProps: {
            subject: '',
            previewText: '',
            backgroundColor: {
                hex: '#f4f4f4'
            },
            fontFamily: 'Arial, Helvetica, sans-serif',
            maxWidth: 600
        },
        render: ({ children })=>/*#__PURE__*/ _jsx(_Fragment, {
                children: children
            })
    },
    categories: {
        layout: {
            title: 'Layout',
            components: [
                'EmailWrapper',
                'EmailSection',
                'EmailColumns'
            ],
            defaultExpanded: true
        },
        content: {
            title: 'Content',
            components: [
                'EmailText',
                'EmailHeading',
                'EmailImage',
                'EmailButton'
            ]
        },
        utility: {
            title: 'Utility',
            components: [
                'EmailSpacer',
                'EmailDivider'
            ]
        },
        prebuilt: {
            title: 'Prebuilt',
            components: [
                'EmailHeader',
                'EmailFooter',
                'EmailSocial'
            ]
        }
    },
    components: {
        EmailWrapper: EmailWrapperEditorConfig,
        EmailSection: EmailSectionEditorConfig,
        EmailColumns: EmailColumnsEditorConfig,
        EmailText: EmailTextEditorConfig,
        EmailHeading: EmailHeadingEditorConfig,
        EmailImage: EmailImageEditorConfig,
        EmailButton: EmailButtonEditorConfig,
        EmailSpacer: EmailSpacerEditorConfig,
        EmailDivider: EmailDividerEditorConfig,
        EmailHeader: EmailHeaderEditorConfig,
        EmailFooter: EmailFooterEditorConfig,
        EmailSocial: EmailSocialEditorConfig
    }
};
