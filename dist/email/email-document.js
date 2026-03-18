/**
 * Email HTML Document Shell
 *
 * Provides the DOCTYPE, html, head, and body wrapper for email HTML.
 * Includes standard email reset CSS and MSO conditional comments.
 */ /**
 * Email reset CSS applied in a style block in the head.
 * These resets normalize rendering across email clients.
 */ export const EMAIL_RESET_CSS = `
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  body { margin: 0 !important; padding: 0 !important; width: 100% !important; min-width: 100% !important; }
  a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
  #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
`.trim();
/**
 * Wraps email content in a complete HTML document.
 * Returns the opening HTML (before content) and closing HTML (after content).
 */ export function getEmailDocumentParts(options = {}) {
    const { previewText = '', backgroundColor = '#f4f4f4', fontFamily = 'Arial, Helvetica, sans-serif', maxWidth = 600 } = options;
    const preheaderHtml = previewText ? `<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">\n${previewText}${'&#847; &zwnj; &nbsp; '.repeat(20)}\n</div>` : '';
    const before = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style type="text/css">
${EMAIL_RESET_CSS}
</style>
</head>
<body style="margin:0;padding:0;background-color:${backgroundColor};font-family:${fontFamily};">
${preheaderHtml}
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${maxWidth}" align="center" style="width:${maxWidth}px;">
<tr>
<td>
<![endif]-->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:${maxWidth}px;margin:0 auto;">
<tr>
<td>`;
    const after = `</td>
</tr>
</table>
<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
</body>
</html>`;
    return {
        before,
        after
    };
}
