const chalk = require('chalk');
const verbose = chalk.bold.yellow;

/**
 * Convert regular JavaScript to bookmarklet
 * @param {string} source - the input
 * @param {object} [options]
 * @param {boolean} options.aggressive - agressively remove code
 * @param {boolean} options.component - use encodeURIComponent, not encodeURI
 * @param {boolean} options.debug - verbose output to the command line
 * @returns bookmarklet
 */

function getBookmarklet (
  source,
  options = { aggressive: false, component: false, debug: false }
) {
  if (!source) {
    return null;
  }
  let bookmarklet = source
    .replace(/^\s?javascript:/gm, '') // Remove any existing 'javascript:' prefix
    .replace(/^\s*\/\/.+/gm, '') // Remove commented lines
    .replace(/^\s*\/\*[^]+?\*\/\n?/gm, '') // Remove block comments
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
    bookmarklet = bookmarklet
      .replace(/(const|let|var)\s+/g, '') // Remove variable declarations
      .replace(/window.(\w)/g, '$1') // Remove window object
      .replace(/===/, '=='); // Use equality instead of identity comparison
  }
  if (options.debug) {
    console.log(verbose('// [debug] bookmarklet before encoding'));
    console.log(bookmarklet);
  }
  const encode = options.component ? encodeURIComponent : encodeURI;
  bookmarklet = 'javascript:' + encode(bookmarklet); // Escape semicolons, double quotes, etc.
  return bookmarklet;
}

module.exports = getBookmarklet;
