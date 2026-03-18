/**
 * SlugPreviewField - Custom Puck field for displaying the computed slug
 *
 * Read-only field that shows the auto-generated URL slug.
 * When page-tree is enabled, slug = folderPath + '/' + pageSegment
 */
import React from 'react';
import type { CustomField } from '@puckeditor/core';
interface SlugPreviewFieldProps {
    value: string;
    label?: string;
    hint?: string;
}
export declare function SlugPreviewField({ value, label, hint, }: SlugPreviewFieldProps): React.JSX.Element;
/**
 * Creates a Puck field configuration for slug preview
 */
export declare function createSlugPreviewField(config?: {
    label?: string;
    hint?: string;
}): CustomField<string>;
export {};
