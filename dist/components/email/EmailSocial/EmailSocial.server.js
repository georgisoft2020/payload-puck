import { jsx as _jsx } from "react/jsx-runtime";
import { TABLE_ATTRS } from '../utils.js';
const PLATFORM_LABELS = {
    facebook: 'Facebook',
    x: 'X',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube'
};
const defaultProps = {
    links: [
        {
            platform: 'facebook',
            url: '#'
        },
        {
            platform: 'x',
            url: '#'
        },
        {
            platform: 'instagram',
            url: '#'
        }
    ],
    iconSize: 32,
    alignment: 'center'
};
export const EmailSocialConfig = {
    label: 'Social Links',
    defaultProps,
    render: ({ links, iconSize, alignment })=>{
        if (!links?.length) {
            return /*#__PURE__*/ _jsx("table", {
                ...TABLE_ATTRS,
                style: {
                    width: '100%',
                    borderCollapse: 'collapse'
                },
                children: /*#__PURE__*/ _jsx("tbody", {
                    children: /*#__PURE__*/ _jsx("tr", {
                        children: /*#__PURE__*/ _jsx("td", {
                            style: {
                                padding: '10px 0'
                            }
                        })
                    })
                })
            });
        }
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
                            padding: '10px 0',
                            textAlign: alignment
                        },
                        children: links.map((link, i)=>/*#__PURE__*/ _jsx("a", {
                                href: link.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                    display: 'inline-block',
                                    width: `${iconSize}px`,
                                    height: `${iconSize}px`,
                                    lineHeight: `${iconSize}px`,
                                    textAlign: 'center',
                                    backgroundColor: '#cccccc',
                                    color: '#ffffff',
                                    borderRadius: '50%',
                                    textDecoration: 'none',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    margin: '0 4px'
                                },
                                children: PLATFORM_LABELS[link.platform]?.charAt(0) ?? '?'
                            }, i))
                    })
                })
            })
        });
    }
};
