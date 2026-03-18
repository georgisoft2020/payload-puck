/**
 * Email Puck configuration - Editor
 *
 * Full interactive editor experience with field factories.
 * Use with PuckEditor for email building.
 */
import type { ComponentConfig } from '@puckeditor/core';
import type { ReactNode } from 'react';
export declare const emailEditorConfig: {
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
            backgroundColor: import("@puckeditor/core").CustomField<import("../fields/shared.js").ColorValue | null>;
            fontFamily: {
                type: "select";
                label: string;
                options: {
                    label: "Arial" | "Helvetica" | "Georgia" | "Times New Roman" | "Courier New" | "Verdana" | "Tahoma" | "Trebuchet MS";
                    value: "Arial, Helvetica, sans-serif" | "Helvetica, Arial, sans-serif" | "Georgia, Times, serif" | "'Times New Roman', Times, serif" | "'Courier New', Courier, monospace" | "Verdana, Geneva, sans-serif" | "Tahoma, Geneva, sans-serif" | "'Trebuchet MS', Helvetica, sans-serif";
                }[];
            };
            maxWidth: {
                type: "number";
                label: string;
                min: number;
                max: number;
            };
        };
        defaultProps: {
            subject: string;
            previewText: string;
            backgroundColor: {
                hex: string;
            };
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
