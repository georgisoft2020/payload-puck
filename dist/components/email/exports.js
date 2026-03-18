/**
 * Individual email component config exports
 *
 * Cherry-pick email components for custom configs.
 *
 * @example
 * ```tsx
 * import {
 *   EmailSectionEditorConfig,
 *   EmailTextEditorConfig,
 * } from '@delmaredigital/payload-puck/email/components'
 * ```
 */ // =============================================================================
// Editor Component Configs (for Puck Editor)
// =============================================================================
// Layout
export { EmailWrapperEditorConfig } from './EmailWrapper/EmailWrapper.editor.js';
export { EmailSectionEditorConfig } from './EmailSection/EmailSection.editor.js';
export { EmailColumnsEditorConfig } from './EmailColumns/EmailColumns.editor.js';
// Content
export { EmailTextEditorConfig } from './EmailText/EmailText.editor.js';
export { EmailHeadingEditorConfig } from './EmailHeading/EmailHeading.editor.js';
export { EmailImageEditorConfig } from './EmailImage/EmailImage.editor.js';
export { EmailButtonEditorConfig } from './EmailButton/EmailButton.editor.js';
// Utility
export { EmailSpacerEditorConfig } from './EmailSpacer/EmailSpacer.editor.js';
export { EmailDividerEditorConfig } from './EmailDivider/EmailDivider.editor.js';
// Prebuilt
export { EmailHeaderEditorConfig } from './EmailHeader/EmailHeader.editor.js';
export { EmailFooterEditorConfig } from './EmailFooter/EmailFooter.editor.js';
export { EmailSocialEditorConfig } from './EmailSocial/EmailSocial.editor.js';
// =============================================================================
// Server Component Configs (for EmailRenderer / renderToEmailHtml)
// =============================================================================
// Layout
export { EmailWrapperConfig } from './EmailWrapper/EmailWrapper.server.js';
export { EmailSectionConfig } from './EmailSection/EmailSection.server.js';
export { EmailColumnsConfig } from './EmailColumns/EmailColumns.server.js';
// Content
export { EmailTextConfig } from './EmailText/EmailText.server.js';
export { EmailHeadingConfig } from './EmailHeading/EmailHeading.server.js';
export { EmailImageConfig } from './EmailImage/EmailImage.server.js';
export { EmailButtonConfig } from './EmailButton/EmailButton.server.js';
// Utility
export { EmailSpacerConfig } from './EmailSpacer/EmailSpacer.server.js';
export { EmailDividerConfig } from './EmailDivider/EmailDivider.server.js';
// Prebuilt
export { EmailHeaderConfig } from './EmailHeader/EmailHeader.server.js';
export { EmailFooterConfig } from './EmailFooter/EmailFooter.server.js';
export { EmailSocialConfig } from './EmailSocial/EmailSocial.server.js';
