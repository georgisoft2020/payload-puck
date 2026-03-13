/**
 * FolderPickerField - Custom Puck field for folder selection
 *
 * Integrates with @delmaredigital/payload-page-tree to allow
 * selecting folders from within the Puck editor.
 */
import React from 'react';
import type { CustomField } from '@puckeditor/core';
interface FolderPickerFieldProps {
    value: string | null;
    onChange: (value: string | null) => void;
    label?: string;
    folderSlug?: string;
}
export declare function FolderPickerField({ value, onChange, label, folderSlug, }: FolderPickerFieldProps): React.JSX.Element;
/**
 * Creates a Puck field configuration for folder selection
 */
export declare function createFolderPickerField(config?: {
    label?: string;
    folderSlug?: string;
}): CustomField<string | null>;
export {};
