import { jsx as _jsx } from "react/jsx-runtime";
import { TABLE_ATTRS } from '../utils.js';
const defaultProps = {
    image: null,
    alt: '',
    width: 600,
    height: null,
    alignment: 'center',
    link: ''
};
export const EmailImageConfig = {
    label: 'Image',
    defaultProps,
    render: ({ image, alt, width, height, alignment, link })=>{
        if (!image?.url) {
            return /*#__PURE__*/ _jsx("table", {
                ...TABLE_ATTRS,
                style: {
                    width: '100%',
                    borderCollapse: 'collapse'
                },
                children: /*#__PURE__*/ _jsx("tbody", {
                    children: /*#__PURE__*/ _jsx("tr", {
                        children: /*#__PURE__*/ _jsx("td", {
                            align: alignment,
                            style: {
                                padding: '20px',
                                textAlign: alignment,
                                color: '#999999',
                                fontSize: '14px'
                            },
                            children: "No image selected"
                        })
                    })
                })
            });
        }
        const imgElement = /*#__PURE__*/ _jsx("img", {
            src: image.url,
            alt: alt || image.alt || '',
            width: width,
            height: height ?? undefined,
            style: {
                display: 'block',
                width: `${width}px`,
                maxWidth: '100%',
                height: height ? `${height}px` : 'auto',
                border: 0,
                outline: 'none',
                textDecoration: 'none'
            }
        });
        const content = link ? /*#__PURE__*/ _jsx("a", {
            href: link,
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
                display: 'block'
            },
            children: imgElement
        }) : imgElement;
        return /*#__PURE__*/ _jsx("table", {
            ...TABLE_ATTRS,
            style: {
                width: '100%',
                borderCollapse: 'collapse'
            },
            children: /*#__PURE__*/ _jsx("tbody", {
                children: /*#__PURE__*/ _jsx("tr", {
                    children: /*#__PURE__*/ _jsx("td", {
                        align: alignment,
                        style: {
                            textAlign: alignment
                        },
                        children: content
                    })
                })
            })
        });
    }
};
