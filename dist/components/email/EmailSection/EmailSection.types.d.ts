import type { ColorValue, PaddingValue } from '../../../fields/shared.js';
export interface EmailSectionProps {
    content: unknown;
    backgroundColor: ColorValue | null;
    padding: PaddingValue | null;
    maxWidth: number;
}
