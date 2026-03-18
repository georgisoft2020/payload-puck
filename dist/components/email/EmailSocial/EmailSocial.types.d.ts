export type SocialPlatform = 'facebook' | 'x' | 'instagram' | 'linkedin' | 'youtube';
export interface SocialLink {
    platform: SocialPlatform;
    url: string;
}
export interface EmailSocialProps {
    links: SocialLink[];
    iconSize: number;
    alignment: 'left' | 'center' | 'right';
}
