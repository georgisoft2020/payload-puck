/**
 * Button Component - Puck Configuration
 *
 * CTA button with customizable styling and link support.
 */
import type { ComponentConfig } from '@puckeditor/core';
import { type PaddingValue, type ColorValue, type BorderValue, type AnimationValue, type TransformValue } from '../../fields/shared.js';
import { type Alignment } from '../../fields/AlignmentField.js';
import { type SizeValue } from '../../fields/SizeField.js';
export interface ButtonProps {
    text: string;
    link: string;
    variant: string;
    size: SizeValue | null;
    openInNewTab: string;
    margin: PaddingValue | null;
    customBackgroundColor: ColorValue | null;
    customTextColor: ColorValue | null;
    customBorder: BorderValue | null;
    alignment: Alignment | null;
    transform: TransformValue | null;
    animation: AnimationValue | null;
    customPadding: PaddingValue | null;
}
export declare const ButtonConfig: ComponentConfig;
