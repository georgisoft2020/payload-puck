import type { ColorValue } from '../../../fields/shared.js';
export interface EmailTextProps {
    content: React.ReactNode;
    fontSize: string;
    color: ColorValue | null;
    alignment: 'left' | 'center' | 'right';
    lineHeight: string;
}
