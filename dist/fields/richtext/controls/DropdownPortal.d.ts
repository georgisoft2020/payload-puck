/**
 * Dropdown - Renders dropdown content using Radix Popover for proper focus management
 *
 * Uses @radix-ui/react-popover which provides:
 * - Proper focus management that integrates with Puck's dirty state tracking
 * - Automatic close on escape and click outside
 * - Focus restoration to trigger element on close
 *
 * IMPORTANT: Uses data-puck-rte-menu attribute so Puck's blur handler recognizes
 * this dropdown as part of the rich text menu. Without this, clicking the dropdown
 * causes the editor to blur, clearing currentRichText state and breaking all menu
 * controls (including native Puck ones like HeadingSelect).
 */
import React, { type ReactNode } from 'react';
interface DropdownProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: ReactNode;
    children: ReactNode;
    minWidth?: number;
}
export declare function Dropdown({ isOpen, onOpenChange, trigger, children, minWidth }: DropdownProps): React.JSX.Element;
export { Dropdown as DropdownPortal };
