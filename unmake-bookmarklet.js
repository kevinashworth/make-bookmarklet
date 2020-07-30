#!/usr/bin/env node
const fs = require('fs');
const { program } = require('commander');

let filename;
program
  .version(require('./package.json').version)
  .arguments('<filename>')
  .action((results) => {
    filename = results;
  });
program.parse(process.argv);

let bookmarklet;
const source = fs.readFileSync(filename, 'utf8');

if (source) {
  bookmarklet = source
    .replace(/^\s?javascript:/gm, '');
  bookmarklet = decodeURIComponent(bookmarklet);

  const prettier = require('prettier');
  const formatted = prettier.format(bookmarklet, {
    parser: 'babel',
    singleQuote: true,
    trailingComma: 'none'
  });

  console.log('// decoded and prettier bookmarklet');
  console.log(formatted);

  const clipboardy = require('clipboardy');
  clipboardy.writeSync(formatted);
  clipboardy.readSync();
}

process.exitCode = 0;
