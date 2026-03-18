import type { ColorValue } from '../../../fields/shared.js';
export interface EmailButtonProps {
    text: string;
    href: string;
    backgroundColor: ColorValue | null;
    textColor: ColorValue | null;
    borderRadius: number;
    padding: string;
    alignment: 'left' | 'center' | 'right';
    fullWidth: boolean;
}
