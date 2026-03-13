import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TABLE_ATTRS, FULL_WIDTH_TABLE_STYLE, vmlBackgroundOpen, vmlBackgroundClose } from '../utils.js';
import { colorValueToEmailCSS } from '../../../fields/shared.js';
const defaultProps = {
    content: [],
    backgroundColor: {
        hex: '#ffffff'
    },
    backgroundImage: '',
    maxWidth: 600
};
export const EmailWrapperConfig = {
    label: 'Wrapper',
    fields: {
        content: {
            type: 'slot'
        }
    },
    defaultProps,
    render: ({ content: Content, backgroundColor, backgroundImage, maxWidth })=>{
        const bgColor = colorValueToEmailCSS(backgroundColor) ?? '#ffffff';
        const ContentSlot = Content;
        const tdStyle = {
            backgroundColor: bgColor
        };
        if (backgroundImage) {
            tdStyle.backgroundImage = `url(${backgroundImage})`;
            tdStyle.backgroundSize = 'cover';
            tdStyle.backgroundPosition = 'center';
        }
        // VML markup is generated internally by vmlBackgroundOpen/Close utilities
        // for Outlook email client compatibility - no user input is used
        return /*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: FULL_WIDTH_TABLE_STYLE,
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsx("tr", {
                    children: /*#__PURE__*/ _jsxs("td", {
                        style: tdStyle,
                        children: [
                            backgroundImage && /*#__PURE__*/ _jsx("div", {
                                dangerouslySetInnerHTML: {
                                    __html: vmlBackgroundOpen({
                                        width: maxWidth ?? 600,
                                        src: backgroundImage
                                    })
                                }
                            }),
                            /*#__PURE__*/ _jsx(ContentSlot, {}),
                            backgroundImage && /*#__PURE__*/ _jsx("div", {
                                dangerouslySetInnerHTML: {
                                    __html: vmlBackgroundClose()
                                }
                            })
                        ]
                    })
                })
            })
        });
    }
};
