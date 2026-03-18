/**
 * PageSegmentField - Custom Puck field for page segment editing
 *
 * Provides an editable text field with automatic slugification.
 * Integrates with @delmaredigital/payload-page-tree plugin.
 *
 * Exports:
 * - PageSegmentField: Basic editable page segment field
 * - LockedPageSegmentField: Locked by default, requires clicking lock icon to edit
 * - createPageSegmentField: Factory for basic field
 * - createLockedPageSegmentField: Factory for locked field (recommended for page-tree)
 */
import React from 'react';
import type { CustomField } from '@puckeditor/core';
interface PageSegmentFieldProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}
interface LockedPageSegmentFieldProps extends PageSegmentFieldProps {
    warningMessage?: string;
}
export declare function PageSegmentField({ value, onChange, label, placeholder, }: PageSegmentFieldProps): React.JSX.Element;
/**
 * Creates a Puck field configuration for page segment editing
 */
export declare function createPageSegmentField(config?: {
    label?: string;
    placeholder?: string;
}): CustomField<string>;
/**
 * PageSegmentField with lock/unlock functionality.
 * Starts locked to prevent accidental URL changes.
 */
export declare function LockedPageSegmentField({ value, onChange, label, placeholder, warningMessage, }: LockedPageSegmentFieldProps): React.JSX.Element;
/**
 * Creates a Puck field configuration for a locked page segment field.
 * Recommended for page-tree integration to prevent accidental URL changes.
 */
export declare function createLockedPageSegmentField(config?: {
    label?: string;
    placeholder?: string;
    warningMessage?: string;
}): CustomField<string>;
export {};
