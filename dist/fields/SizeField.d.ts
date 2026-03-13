/**
 * SizeField - Custom Puck field for button/element sizing
 *
 * Provides preset size options (sm, default, lg) with a "custom" mode
 * that reveals detailed controls for height, padding, and font size.
 */
import React from 'react';
import type { CustomField } from '@puckeditor/core';
export { type SizeMode, type SizeUnit, type SizeValue, sizeValueToCSS, getSizeClasses, } from './shared.js';
import type { SizeValue } from './shared.js';
interface SizeFieldProps {
    value: SizeValue | null;
    onChange: (value: SizeValue | null) => void;
    label?: string;
    readOnly?: boolean;
    /** Show height input (default: true) */
    showHeight?: boolean;
    /** Show font size input (default: true) */
    showFontSize?: boolean;
}
declare function SizeFieldInner({ value, onChange, label, readOnly, showHeight, showFontSize, }: SizeFieldProps): React.JSX.Element;
export declare const SizeField: React.MemoExoticComponent<typeof SizeFieldInner>;
interface CreateSizeFieldConfig {
    label?: string;
    showHeight?: boolean;
    showFontSize?: boolean;
}
/**
 * Creates a Puck field configuration for size control
 */
export declare function createSizeField(config?: CreateSizeFieldConfig): CustomField<SizeValue | null>;
