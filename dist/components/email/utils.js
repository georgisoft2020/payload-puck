/**
 * Shared email rendering utilities
 *
 * Helpers for building email-safe HTML with table-based layouts.
 * All email components use these to ensure consistent rendering.
 */ // =============================================================================
// Table Helper Props
// =============================================================================
/** Standard table attributes for email-safe presentation tables */ export const TABLE_ATTRS = {
    role: 'presentation',
    cellPadding: '0',
    cellSpacing: '0',
    border: 0
};
/** Full-width table style (100% width, no borders) */ export const FULL_WIDTH_TABLE_STYLE = {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0
};
/** Centered content table (max-width with auto margins) */ export function centeredTableStyle(maxWidth) {
    return {
        width: '100%',
        maxWidth: `${maxWidth}px`,
        margin: '0 auto',
        borderCollapse: 'collapse',
        borderSpacing: 0
    };
}
/** Maps alignment to table `align` attribute value */ export function emailAlign(alignment) {
    return alignment ?? 'left';
}
/** Maps alignment to margin style for block centering */ export function alignmentToMargin(alignment) {
    switch(alignment){
        case 'center':
            return {
                marginLeft: 'auto',
                marginRight: 'auto'
            };
        case 'right':
            return {
                marginLeft: 'auto',
                marginRight: 0
            };
        default:
            return {
                marginLeft: 0,
                marginRight: 'auto'
            };
    }
}
// =============================================================================
// Font Stacks (web-safe only)
// =============================================================================
export const WEB_SAFE_FONTS = [
    {
        label: 'Arial',
        value: 'Arial, Helvetica, sans-serif'
    },
    {
        label: 'Helvetica',
        value: 'Helvetica, Arial, sans-serif'
    },
    {
        label: 'Georgia',
        value: 'Georgia, Times, serif'
    },
    {
        label: 'Times New Roman',
        value: "'Times New Roman', Times, serif"
    },
    {
        label: 'Courier New',
        value: "'Courier New', Courier, monospace"
    },
    {
        label: 'Verdana',
        value: 'Verdana, Geneva, sans-serif'
    },
    {
        label: 'Tahoma',
        value: 'Tahoma, Geneva, sans-serif'
    },
    {
        label: 'Trebuchet MS',
        value: "'Trebuchet MS', Helvetica, sans-serif"
    }
];
// =============================================================================
// TipTap HTML to Email-Safe HTML
// =============================================================================
/**
 * Converts TipTap-generated HTML to email-safe inline-styled HTML.
 *
 * TipTap outputs semantic HTML with classes. Email clients need:
 * - Inline styles instead of classes
 * - No CSS that email clients strip (position, display:flex, etc.)
 * - Block elements with explicit margins
 */ export function tiptapHtmlToEmailHtml(html, options) {
    if (!html) return '';
    const baseStyle = [
        options?.fontSize ? `font-size:${options.fontSize}` : 'font-size:16px',
        options?.color ? `color:${options.color}` : 'color:#333333',
        options?.lineHeight ? `line-height:${options.lineHeight}` : 'line-height:1.5',
        options?.fontFamily ? `font-family:${options.fontFamily}` : '',
        'margin:0',
        'padding:0'
    ].filter(Boolean).join(';');
    // First strip existing style and class attributes (TipTap may add them)
    // so we don't end up with duplicate attributes
    const cleaned = html.replace(/\s+style="[^"]*"/g, '').replace(/\s+class="[^"]*"/g, '');
    const result = cleaned// Paragraphs
    .replace(/<p>/g, `<p style="${baseStyle};margin-bottom:1em">`).replace(/<p\s/g, `<p style="${baseStyle};margin-bottom:1em" `)// Headings
    .replace(/<h1>/g, `<h1 style="${baseStyle};font-size:32px;font-weight:bold;margin-bottom:0.5em">`).replace(/<h2>/g, `<h2 style="${baseStyle};font-size:24px;font-weight:bold;margin-bottom:0.5em">`).replace(/<h3>/g, `<h3 style="${baseStyle};font-size:20px;font-weight:bold;margin-bottom:0.5em">`)// Lists
    .replace(/<ul>/g, `<ul style="margin:0 0 1em 0;padding-left:20px;${baseStyle}">`).replace(/<ol>/g, `<ol style="margin:0 0 1em 0;padding-left:20px;${baseStyle}">`).replace(/<li>/g, '<li style="margin-bottom:0.25em">')// Links
    .replace(/<a /g, '<a style="color:#007bff;text-decoration:underline" ')// Blockquotes
    .replace(/<blockquote>/g, `<blockquote style="margin:0 0 1em 0;padding:10px 20px;border-left:4px solid #dddddd;${baseStyle}">`);
    return result;
}
// =============================================================================
// VML Background Image (Outlook)
// =============================================================================
/**
 * Generates VML markup for background images in Outlook.
 * Wrap around your content in a conditional comment.
 */ export function vmlBackgroundOpen(options) {
    return `<!--[if gte mso 9]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${options.width}px${options.height ? `;height:${options.height}px` : ''}">
<v:fill type="frame" src="${options.src}" />
<v:textbox inset="0,0,0,0">
<![endif]-->`;
}
export function vmlBackgroundClose() {
    return `<!--[if gte mso 9]>
</v:textbox>
</v:rect>
<![endif]-->`;
}
