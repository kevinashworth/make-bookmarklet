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

  console.log('// decoded bookmarklet');
  console.log(bookmarklet);

  const clipboardy = require('clipboardy');
  clipboardy.writeSync(bookmarklet);
  clipboardy.readSync();
}

process.exitCode = 0;
