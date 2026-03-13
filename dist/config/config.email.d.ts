/**
 * Email Puck configuration - Server-safe
 *
 * All components render to table-based, inline-styled HTML
 * compatible with email clients. No Tailwind, no CSS classes.
 *
 * Use with EmailRenderer or renderToEmailHtml().
 */
import type { ComponentConfig } from '@puckeditor/core';
import type { ReactNode } from 'react';
export declare const emailBaseConfig: {
    root: {
        fields: {
            subject: {
                type: "text";
                label: string;
            };
            previewText: {
                type: "textarea";
                label: string;
            };
            maxWidth: {
                type: "number";
                label: string;
            };
        };
        defaultProps: {
            subject: string;
            previewText: string;
            backgroundColor: string;
            fontFamily: string;
            maxWidth: number;
        };
        render: ({ children }: {
            children: ReactNode;
        }) => import("react").JSX.Element;
    };
    categories: {
        layout: {
            title: string;
            components: string[];
            defaultExpanded: true;
        };
        content: {
            title: string;
            components: string[];
        };
        utility: {
            title: string;
            components: string[];
        };
        prebuilt: {
            title: string;
            components: string[];
        };
    };
    components: {
        EmailWrapper: ComponentConfig<any>;
        EmailSection: ComponentConfig<any>;
        EmailColumns: ComponentConfig<any>;
        EmailText: ComponentConfig<any>;
        EmailHeading: ComponentConfig<any>;
        EmailImage: ComponentConfig<any>;
        EmailButton: ComponentConfig<any>;
        EmailSpacer: ComponentConfig<any>;
        EmailDivider: ComponentConfig<any>;
        EmailHeader: ComponentConfig<any>;
        EmailFooter: ComponentConfig<any>;
        EmailSocial: ComponentConfig<any>;
    };
};
