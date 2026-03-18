/**
 * LockedField - Custom Puck field wrapper that prevents accidental edits
 *
 * Wraps a field with a lock/unlock toggle. When locked, the field is read-only.
 * Click the lock icon to toggle editing.
 *
 * Exports:
 * - LockedTextField: A text input with lock/unlock functionality
 * - LockedRadioField: A radio button group with lock/unlock functionality
 * - createLockedTextField: Factory for Puck field configuration
 * - createLockedRadioField: Factory for Puck field configuration
 */
import React from 'react';
import type { CustomField } from '@puckeditor/core';
interface LockedTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    warningMessage?: string;
}
interface LockedRadioFieldProps {
    value: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    options: {
        label: string;
        value: boolean;
    }[];
    warningMessage?: string;
}
export declare function LockedTextField({ value, onChange, label, placeholder, warningMessage, }: LockedTextFieldProps): React.JSX.Element;
export declare function LockedRadioField({ value, onChange, label, options, warningMessage, }: LockedRadioFieldProps): React.JSX.Element;
/**
 * Creates a Puck field configuration for a locked text input
 */
export declare function createLockedTextField(config: {
    label?: string;
    placeholder?: string;
    warningMessage?: string;
}): CustomField<string>;
/**
 * Creates a Puck field configuration for a locked radio button group
 */
export declare function createLockedRadioField(config: {
    label?: string;
    options: {
        label: string;
        value: boolean;
    }[];
    warningMessage?: string;
}): CustomField<boolean>;
/**
 * Pre-built locked slug field - prevents accidental URL changes
 *
 * Use in Puck root config:
 * ```tsx
 * root: {
 *   fields: {
 *     slug: lockedSlugField,
 *   }
 * }
 * ```
 */
export declare const lockedSlugField: CustomField<string>;
/**
 * Pre-built locked isHomepage field - prevents accidental homepage changes
 *
 * Use in Puck root config:
 * ```tsx
 * root: {
 *   fields: {
 *     isHomepage: lockedHomepageField,
 *   }
 * }
 * ```
 */
export declare const lockedHomepageField: CustomField<boolean>;
export {};
