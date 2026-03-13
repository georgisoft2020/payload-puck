import { jsx as _jsx } from "react/jsx-runtime";
import { TABLE_ATTRS, centeredTableStyle } from '../utils.js';
import { colorValueToEmailCSS, paddingValueToEmailCSS } from '../../../fields/shared.js';
const defaultProps = {
    content: [],
    backgroundColor: null,
    padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
        unit: 'px',
        linked: true
    },
    maxWidth: 600
};
export const EmailSectionConfig = {
    label: 'Section',
    fields: {
        content: {
            type: 'slot'
        }
    },
    defaultProps,
    render: ({ content: Content, backgroundColor, padding, maxWidth })=>{
        const bgColor = colorValueToEmailCSS(backgroundColor);
        const paddingCSS = paddingValueToEmailCSS(padding);
        const ContentSlot = Content;
        return /*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: centeredTableStyle(maxWidth),
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsx("tr", {
                    children: /*#__PURE__*/ _jsx("td", {
                        style: {
                            ...bgColor ? {
                                backgroundColor: bgColor
                            } : {},
                            ...paddingCSS ? {
                                padding: paddingCSS
                            } : {}
                        },
                        children: /*#__PURE__*/ _jsx(ContentSlot, {})
                    })
                })
            })
        });
    }
};
