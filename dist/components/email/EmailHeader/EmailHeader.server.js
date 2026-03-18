import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TABLE_ATTRS, FULL_WIDTH_TABLE_STYLE } from '../utils.js';
import { colorValueToEmailCSS } from '../../../fields/shared.js';
const defaultProps = {
    logoSrc: '',
    logoAlt: 'Logo',
    logoWidth: 150,
    title: '',
    backgroundColor: {
        hex: '#ffffff'
    }
};
export const EmailHeaderConfig = {
    label: 'Header',
    defaultProps,
    render: ({ logoSrc, logoAlt, logoWidth, title, backgroundColor })=>{
        const bgColor = colorValueToEmailCSS(backgroundColor) ?? '#ffffff';
        return /*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: FULL_WIDTH_TABLE_STYLE,
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsx("tr", {
                    children: /*#__PURE__*/ _jsxs("td", {
                        align: "center",
                        style: {
                            backgroundColor: bgColor,
                            padding: '20px',
                            textAlign: 'center'
                        },
                        children: [
                            logoSrc && /*#__PURE__*/ _jsx("img", {
                                src: logoSrc,
                                alt: logoAlt,
                                width: logoWidth,
                                style: {
                                    display: 'block',
                                    margin: '0 auto',
                                    width: `${logoWidth}px`,
                                    maxWidth: '100%',
                                    height: 'auto',
                                    border: 0
                                }
                            }),
                            title && /*#__PURE__*/ _jsx("p", {
                                style: {
                                    margin: logoSrc ? '12px 0 0 0' : '0',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#333333',
                                    lineHeight: '1.2'
                                },
                                children: title
                            })
                        ]
                    })
                })
            })
        });
    }
};
