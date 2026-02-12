import sanitizeHtml from "sanitize-html";

export const sanitizeRichText = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "strong",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "br",
      "h1",
      "h2",
      "h3",
      "blockquote",
    ],
    allowedAttributes: {},
  });
};
