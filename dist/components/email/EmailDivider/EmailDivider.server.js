import { jsx as _jsx } from "react/jsx-runtime";
import { TABLE_ATTRS } from '../utils.js';
import { colorValueToEmailCSS } from '../../../fields/shared.js';
const defaultProps = {
    color: {
        hex: '#dddddd'
    },
    thickness: 1,
    width: '100%'
};
export const EmailDividerConfig = {
    label: 'Divider',
    defaultProps,
    render: ({ color, thickness, width })=>{
        const borderColor = colorValueToEmailCSS(color) ?? '#dddddd';
        return /*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: {
                width,
                margin: '0 auto',
                borderCollapse: 'collapse'
            },
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsx("tr", {
                    children: /*#__PURE__*/ _jsx("td", {
                        style: {
                            borderTop: `${thickness}px solid ${borderColor}`,
                            fontSize: '1px',
                            lineHeight: '1px',
                            height: '1px'
                        },
                        children: " "
                    })
                })
            })
        });
    }
};
