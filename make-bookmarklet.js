#!/usr/bin/env node
const fs = require('fs');
const { program } = require('commander');

let filenameValue;
program
  .version(require('./package.json').version)
  .arguments('<filename>')
  .action(function (filename) {
    filenameValue = filename;
  });
program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ node make-bookmarklet.js foo.js');
  console.log('  $ node make-bookmarklet /Users/baz/Documents/bar.js');
});
program.parse(process.argv);

let bookmarklet;
const filename = filenameValue;
const source = fs.readFileSync(filename, 'utf8');

if (source) {
  bookmarklet = source
    .replace(/^\s?javascript:/gm, '') // Zap first line if there's already a bookmarklet comment
    .replace(/^\s*\/\/.+/gm, '') // Zap commented lines
    .replace(/^\s*\/\*[^]+?\*\/\n?/gm, '') // Zap block comments
    .replace(/\t/g, ' ') // Tabs to spaces
    .replace(/[ ]{2,}/g, ' ') // Space runs to one space
    .replace(/^\s+/gm, '') // Zap line-leading whitespace
    .replace(/\s+$/gm, '') // Zap line-ending whitespace
    .replace(/\n/gm, '') // Zap newlines
    .replace(/\s+=/g, '=') // Zap space before '='
    .replace(/=\s+/g, '=') // Zap space after '='
    .replace(/\s+\(/g, '(') // Zap space before '('
    .replace(/\)\s+/g, ')') // Zap space after ')'
    .replace(/\s+{/g, '{') // Zap space before '{'
    .replace(/}\s+/g, '}') // Zap space after '}'
    .replace(/\s+>/g, '>') // Zap space before '>'
    .replace(/>\s+/g, '>') // Zap space after '>'
    .replace(/\s+\+/g, '+') // Zap space before '+'
    .replace(/\+\s+/g, '+') // Zap space after '+'
    .replace(/,\s+/g, ','); // Zap space after ','
  bookmarklet = 'javascript:' + encodeURIComponent(bookmarklet); // Escape spaces, quotes, etc.

  console.log('// bookmarklet');
  console.log(bookmarklet);

  const clipboardy = require('clipboardy');
  clipboardy.writeSync(bookmarklet);
  clipboardy.readSync();
}

process.exitCode = 0;
