export function parseFacebookIframeSrc(iframeTag:string) {
  // Extract the 'src' attribute from the iframe tag
  const srcAttributeMatch = iframeTag.match(/src="([^"]+)"/);
  const srcAttribute = srcAttributeMatch[1];
  const url = new URL(decodeURIComponent(srcAttribute));
 const href = url.search
 const link = href.slice(href.indexOf('https://www.facebook.com'),href.indexOf('&show_text'))
 return link;

}