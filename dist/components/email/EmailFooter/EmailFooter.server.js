import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TABLE_ATTRS, FULL_WIDTH_TABLE_STYLE } from '../utils.js';
const mutedStyle = {
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#999999',
    margin: '0 0 4px 0'
};
const defaultProps = {
    companyName: 'Company Name',
    address: '123 Main St, City, State 12345',
    unsubscribeText: 'Unsubscribe',
    unsubscribeUrl: '#'
};
export const EmailFooterConfig = {
    label: 'Footer',
    defaultProps,
    render: ({ companyName, address, unsubscribeText, unsubscribeUrl })=>/*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: FULL_WIDTH_TABLE_STYLE,
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsx("tr", {
                    children: /*#__PURE__*/ _jsxs("td", {
                        align: "center",
                        style: {
                            padding: '20px',
                            textAlign: 'center',
                            borderTop: '1px solid #eeeeee'
                        },
                        children: [
                            /*#__PURE__*/ _jsx("p", {
                                style: mutedStyle,
                                children: companyName
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                style: mutedStyle,
                                children: address
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                style: {
                                    ...mutedStyle,
                                    marginTop: '8px'
                                },
                                children: /*#__PURE__*/ _jsx("a", {
                                    href: unsubscribeUrl,
                                    style: {
                                        color: '#999999',
                                        textDecoration: 'underline',
                                        fontSize: '12px'
                                    },
                                    children: unsubscribeText
                                })
                            })
                        ]
                    })
                })
            })
        })
};
