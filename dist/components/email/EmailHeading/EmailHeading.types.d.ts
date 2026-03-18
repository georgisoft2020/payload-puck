import type { ColorValue } from '../../../fields/shared.js';
export interface EmailHeadingProps {
    text: string;
    level: 1 | 2 | 3;
    color: ColorValue | null;
    alignment: 'left' | 'center' | 'right';
}
