import { jsx as _jsx } from "react/jsx-runtime";
import { colorValueToEmailCSS } from '../../../fields/shared.js';
const HEADING_SIZES = {
    1: '32px',
    2: '24px',
    3: '20px'
};
const defaultProps = {
    text: 'Heading',
    level: 1,
    color: {
        hex: '#333333'
    },
    alignment: 'left'
};
export const EmailHeadingConfig = {
    label: 'Heading',
    defaultProps,
    render: ({ text, level, color, alignment })=>{
        const textColor = colorValueToEmailCSS(color) ?? '#333333';
        const fontSize = HEADING_SIZES[level] ?? '24px';
        return /*#__PURE__*/ _jsx("p", {
            style: {
                margin: '0 0 16px 0',
                padding: 0,
                fontSize,
                fontWeight: 'bold',
                color: textColor,
                textAlign: alignment,
                lineHeight: '1.2'
            },
            children: text
        });
    }
};
