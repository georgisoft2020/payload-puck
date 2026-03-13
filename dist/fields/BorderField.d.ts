/**
 * BorderField - Custom Puck field for border styling
 *
 * This component provides:
 * - Border width input (px)
 * - Border color picker (reuses ColorPickerField)
 * - Border radius input
 * - Border style selector (solid, dashed, dotted, none)
 * - Per-side toggles (top, right, bottom, left)
 */
import React from 'react';
import type { CustomField } from '@puckeditor/core';
import type { BorderValue } from './shared.js';
interface BorderFieldProps {
    value: BorderValue | null;
    onChange: (value: BorderValue | null) => void;
    label?: string;
    readOnly?: boolean;
}
declare function BorderFieldInner({ value, onChange, label, readOnly, }: BorderFieldProps): React.JSX.Element;
export declare const BorderField: React.MemoExoticComponent<typeof BorderFieldInner>;
/**
 * Creates a Puck field configuration for border styling
 */
export declare function createBorderField(config: {
    label?: string;
}): CustomField<BorderValue | null>;
export {};
