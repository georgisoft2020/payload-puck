/**
 * GradientEditor - Component for editing gradient values
 *
 * This component provides:
 * - Type selector (linear/radial toggle)
 * - Angle slider for linear gradients (0-360)
 * - Shape and position selectors for radial gradients
 * - Gradient stops list with color pickers and position sliders
 * - Add/remove stop buttons
 * - Visual gradient preview bar
 */
import React from 'react';
import type { GradientValue } from './shared.js';
interface GradientEditorProps {
    value: GradientValue | null;
    onChange: (value: GradientValue) => void;
    readOnly?: boolean;
}
declare function GradientEditorInner({ value, onChange, readOnly }: GradientEditorProps): React.JSX.Element;
export declare const GradientEditor: React.MemoExoticComponent<typeof GradientEditorInner>;
export {};
