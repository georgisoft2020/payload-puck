import { jsx as _jsx } from "react/jsx-runtime";
import { TABLE_ATTRS, FULL_WIDTH_TABLE_STYLE } from '../utils.js';
const defaultProps = {
    height: 24
};
export const EmailSpacerConfig = {
    label: 'Spacer',
    defaultProps,
    render: ({ height })=>/*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: FULL_WIDTH_TABLE_STYLE,
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsx("tr", {
                    children: /*#__PURE__*/ _jsx("td", {
                        style: {
                            height: `${height}px`,
                            fontSize: '1px',
                            lineHeight: `${height}px`
                        },
                        children: " "
                    })
                })
            })
        })
};
