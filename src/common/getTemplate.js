const escapeHtml = (str) =>
  str ? String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[m])) : '';

const getTemplate = (template) => {
  const safeUrl = escapeHtml(template.bgImage);
  const backgroundImageLayer = safeUrl
    ? `<image href="${safeUrl}"
        x="0" y="0"
        width="700"
        height="${parseInt(template.height)}"
        preserveAspectRatio="xMidYMid slice" />`
    : '';

  return `
    <svg width="${template.width || '700px'}" height="${parseInt(
      template.height
    )}px" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
      @font-face{
        font-family: "customFont";
        src: ${template.font.src}
      }
      </style>
    </defs>
    ${backgroundImageLayer}
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
                ${template.css}
            </style>
            ${template.structure}
        </div>
    </foreignObject>
    </svg>`;
};

module.exports = getTemplate;
