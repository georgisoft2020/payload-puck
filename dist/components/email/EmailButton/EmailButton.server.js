import { jsx as _jsx } from "react/jsx-runtime";
import { TABLE_ATTRS } from '../utils.js';
import { colorValueToEmailCSS } from '../../../fields/shared.js';
const defaultProps = {
    text: 'Click Here',
    href: '#',
    backgroundColor: {
        hex: '#007bff'
    },
    textColor: {
        hex: '#ffffff'
    },
    borderRadius: 4,
    padding: '12px 24px',
    alignment: 'center',
    fullWidth: false
};
export const EmailButtonConfig = {
    label: 'Button',
    defaultProps,
    render: ({ text, href, backgroundColor, textColor, borderRadius, padding, alignment, fullWidth })=>{
        const bgColor = colorValueToEmailCSS(backgroundColor) ?? '#007bff';
        const txtColor = colorValueToEmailCSS(textColor) ?? '#ffffff';
        const tableStyle = fullWidth ? {
            width: '100%',
            borderCollapse: 'collapse'
        } : {
            borderCollapse: 'collapse'
        };
        const alignAttr = fullWidth ? undefined : alignment;
        return /*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: tableStyle,
            align: alignAttr,
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsx("tr", {
                    children: /*#__PURE__*/ _jsx("td", {
                        align: "center",
                        style: {
                            backgroundColor: bgColor,
                            borderRadius: `${borderRadius}px`,
                            padding: 0
                        },
                        children: /*#__PURE__*/ _jsx("a", {
                            href: href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                                display: 'inline-block',
                                width: fullWidth ? '100%' : undefined,
                                backgroundColor: bgColor,
                                color: txtColor,
                                fontWeight: 'bold',
                                fontSize: '16px',
                                textDecoration: 'none',
                                textAlign: 'center',
                                padding,
                                borderRadius: `${borderRadius}px`,
                                border: `1px solid ${bgColor}`,
                                boxSizing: 'border-box'
                            },
                            children: text
                        })
                    })
                })
            })
        });
    }
};
