import { jsx as _jsx } from "react/jsx-runtime";
import { colorValueToEmailCSS } from '../../../fields/shared.js';
import { tiptapHtmlToEmailHtml } from '../utils.js';
const defaultProps = {
    content: '<p>Enter your text here...</p>',
    fontSize: '16px',
    color: {
        hex: '#333333'
    },
    alignment: 'left',
    lineHeight: '1.5'
};
export const EmailTextConfig = {
    label: 'Text',
    defaultProps,
    render: ({ content, fontSize, color, alignment, lineHeight })=>{
        const textColor = colorValueToEmailCSS(color) ?? '#333333';
        const htmlContent = typeof content === 'string' ? tiptapHtmlToEmailHtml(content, {
            fontSize,
            color: textColor,
            lineHeight
        }) : '';
        return /*#__PURE__*/ _jsx("div", {
            style: {
                fontSize,
                color: textColor,
                textAlign: alignment,
                lineHeight
            },
            dangerouslySetInnerHTML: {
                __html: htmlContent
            }
        });
    }
};
