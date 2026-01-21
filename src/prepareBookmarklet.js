/**
 * Make regular JavaScript suitable for a bookmarklet
 * @param {string} source - the input
 * @param {object} [options]
 * @param {boolean} options.aggressive - agressively remove code
 * @returns prepared JavaScript
 */

function prepareBookmarklet (
  source,
  options = { aggressive: false, component: false, debug: false }
) {
  if (!source) {
    return source;
  }
  let prepared = source
    .replace(/^\s?javascript:/gm, '') // Remove any existing 'javascript:' prefix
    .replace(/^\s*\/\/.+/gm, '') // Remove commented lines
    .replace(/\/\/.+/g, '') // Remove in-line comments
    .replace(/^\s*\/\*[\s\S]*?\*\/\n?/gm, '') // Remove block comments that occupy a full line (and trailing newline)
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove inline block comments
    .replace(/\t/g, ' ') // Tabs to spaces
    .replace(/\r?\n|\r/gm, ' ') // Newlines to spaces
    .replace(/[ ]{2,}/g, ' ') // Space runs to one space
    .replace(/^\s+/gm, '') // Remove line-leading whitespace
    .replace(/\s+$/gm, '') // Remove line-ending whitespace
    .replace(/\s?(\+|-|\*|\/|\*\*|%|\+\+|--|&&|\|\|)\s?/g, '$1') // Remove whitespace before, after operators
    .replace(/\s?(>|<|<=|>=|!=|!==|==|===)\s?/g, '$1') // Remove whitespace before, after comparators
    .replace(/\s?(=|\+=|-=|\*=|\/=|%=)\s?/g, '$1') // Remove whitespace before, after assignment
    .replace(/\s?(\(|{|\[|\)|}|\])\s?/g, '$1') // Remove whitespace before, after parens/braces/brackets
    .replace(/\s?(,|;|:)\s?/g, '$1'); // Remove whitespace before, after punctuation
  if (options.aggressive) {
    prepared = prepared
      .replace(/(const|let|var)\s+/g, '') // Remove variable declarations
      .replace(/window.(\w)/g, '$1') // Remove window object
      .replace(/===/g, '=='); // Use equality instead of identity comparison
  }
  return prepared;
}

export default prepareBookmarklet;
