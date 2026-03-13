import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TABLE_ATTRS, FULL_WIDTH_TABLE_STYLE } from '../utils.js';
const defaultProps = {
    columnCount: 2,
    column1: [],
    column2: [],
    column3: [],
    gap: 16,
    verticalAlign: 'top'
};
export const EmailColumnsConfig = {
    label: 'Columns',
    fields: {
        column1: {
            type: 'slot'
        },
        column2: {
            type: 'slot'
        },
        column3: {
            type: 'slot'
        }
    },
    defaultProps,
    render: ({ columnCount, column1: Col1, column2: Col2, column3: Col3, gap, verticalAlign })=>{
        const ColSlot1 = Col1;
        const ColSlot2 = Col2;
        const ColSlot3 = Col3;
        const halfGap = Math.floor(gap / 2);
        const colStyle = {
            verticalAlign,
            paddingLeft: `${halfGap}px`,
            paddingRight: `${halfGap}px`
        };
        return /*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: FULL_WIDTH_TABLE_STYLE,
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsxs("tr", {
                    children: [
                        /*#__PURE__*/ _jsx("td", {
                            style: colStyle,
                            children: /*#__PURE__*/ _jsx(ColSlot1, {})
                        }),
                        /*#__PURE__*/ _jsx("td", {
                            style: colStyle,
                            children: /*#__PURE__*/ _jsx(ColSlot2, {})
                        }),
                        columnCount === 3 && /*#__PURE__*/ _jsx("td", {
                            style: colStyle,
                            children: /*#__PURE__*/ _jsx(ColSlot3, {})
                        })
                    ]
                })
            })
        });
    }
};
