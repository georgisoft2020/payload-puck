import type { MediaReference } from '../../../fields/MediaField.js';
export interface EmailImageProps {
    image: MediaReference | null;
    alt: string;
    width: number;
    height: number | null;
    alignment: 'left' | 'center' | 'right';
    link: string;
}
