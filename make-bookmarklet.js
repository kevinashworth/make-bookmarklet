#!/usr/bin/env node
const fs = require('fs');
const { program } = require('commander');

let filename;
program
  .arguments('<filename>')
  .action((results) => {
    filename = results;
  });
program
  .option('-a, --aggressive', 'agressively remove code')
  .option('-c, --component', 'use encodeURIComponent, not encodeURI');
program
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ node make-bookmarklet.js foo.js');
    console.log('  $ node make-bookmarklet /Users/baz/Documents/bar.js -ac');
  });
program
  .version(require('./package.json').version);
program
  .parse(process.argv);

let bookmarklet;
const source = fs.readFileSync(filename, 'utf8');

if (source) {
  bookmarklet = source
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
    .replace(/\s?(,|;)\s?/g, '$1'); // Remove whitespace before, after punctuation
  if (program.aggressive) {
    bookmarklet = bookmarklet
      .replace(/(const|let|var)\s+/g, '') // Remove variable declarations
      .replace(/window.(\w)/g, '$1') // Remove window object
      .replace(/===/, '=='); // Use equality instead of identity comparison
  }
  if (program.debug) {
    console.log(' ');
    console.log('// [debug] bookmarklet before encoding');
    console.log(bookmarklet);
    console.log(' ');
  }
  const encode = program.component ? encodeURIComponent : encodeURI;
  bookmarklet = 'javascript:' + encode(bookmarklet); // Escape semicolons, double quotes, etc.

  console.log('// bookmarklet');
  console.log(bookmarklet);

  const clipboardy = require('clipboardy');
  clipboardy.writeSync(bookmarklet);
  clipboardy.readSync();
}

process.exitCode = 0;
