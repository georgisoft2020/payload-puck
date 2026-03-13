/**
 * Email Puck configuration - Server-safe
 *
 * All components render to table-based, inline-styled HTML
 * compatible with email clients. No Tailwind, no CSS classes.
 *
 * Use with EmailRenderer or renderToEmailHtml().
 */ import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// Layout
import { EmailWrapperConfig } from '../components/email/EmailWrapper/EmailWrapper.server.js';
import { EmailSectionConfig } from '../components/email/EmailSection/EmailSection.server.js';
import { EmailColumnsConfig } from '../components/email/EmailColumns/EmailColumns.server.js';
// Content
import { EmailTextConfig } from '../components/email/EmailText/EmailText.server.js';
import { EmailHeadingConfig } from '../components/email/EmailHeading/EmailHeading.server.js';
import { EmailImageConfig } from '../components/email/EmailImage/EmailImage.server.js';
import { EmailButtonConfig } from '../components/email/EmailButton/EmailButton.server.js';
// Utility
import { EmailSpacerConfig } from '../components/email/EmailSpacer/EmailSpacer.server.js';
import { EmailDividerConfig } from '../components/email/EmailDivider/EmailDivider.server.js';
// Prebuilt
import { EmailHeaderConfig } from '../components/email/EmailHeader/EmailHeader.server.js';
import { EmailFooterConfig } from '../components/email/EmailFooter/EmailFooter.server.js';
import { EmailSocialConfig } from '../components/email/EmailSocial/EmailSocial.server.js';
export const emailBaseConfig = {
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
            maxWidth: {
                type: 'number',
                label: 'Max Width (px)'
            }
        },
        defaultProps: {
            subject: '',
            previewText: '',
            backgroundColor: '#f4f4f4',
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
        EmailWrapper: EmailWrapperConfig,
        EmailSection: EmailSectionConfig,
        EmailColumns: EmailColumnsConfig,
        EmailText: EmailTextConfig,
        EmailHeading: EmailHeadingConfig,
        EmailImage: EmailImageConfig,
        EmailButton: EmailButtonConfig,
        EmailSpacer: EmailSpacerConfig,
        EmailDivider: EmailDividerConfig,
        EmailHeader: EmailHeaderConfig,
        EmailFooter: EmailFooterConfig,
        EmailSocial: EmailSocialConfig
    }
};
