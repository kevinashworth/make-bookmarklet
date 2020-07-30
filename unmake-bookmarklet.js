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

  const standard = require('semistandard');
  const formatted = standard.lintTextSync(bookmarklet, {
    fix: true,
    globals: ['$']
  });
  // }).results[0].output;
  console.log('// decoded and semistandard-ized bookmarklet');
  console.log(formatted);

  console.log('// results');
  console.log(JSON.stringify(formatted, null, 2));

  // const clipboardy = require('clipboardy');
  // clipboardy.writeSync(formatted);
  // clipboardy.readSync();
}

process.exitCode = 0;
