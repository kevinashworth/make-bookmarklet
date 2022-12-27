/**
 * Convert regular JavaScript to bookmarklet
 * @param {string} source - the input
 * @param {object} [options]
 * @param {boolean} options.component - use encodeURIComponent, not encodeURI
 * @returns bookmarklet
 */

function encodeBookmarklet (
  source,
  options = { aggressive: false, component: false, debug: false }
) {
  if (!source) {
    return null;
  }
  const encode = options.component ? encodeURIComponent : encodeURI;
  const bookmarklet = 'javascript:' + encode(source); // Escape semicolons, double quotes, etc.
  return bookmarklet;
}

module.exports = encodeBookmarklet;
