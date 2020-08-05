#!/usr/bin/env node
const fs = require('fs');
const { program } = require('commander');
var chalk = require('chalk');
var error = chalk.bold.red;
var success = chalk.bold.green;
var verbose = chalk.bold.yellow;

let filename;
program
  .version(require('./package.json').version)
  .arguments('<filename>')
  .action((results) => {
    filename = results;
  });
program.option('-d, --debug', 'verbose output to the command line');
program.parse(process.argv);

let bookmarklet;
const source = fs.readFileSync(filename, 'utf8');

if (source) {
  if (program.debug) {
    console.log(verbose('// [debug] input'));
    console.log(source);
    console.log(' ');
  }
  bookmarklet = source.replace(/^\s?javascript:/gm, '');
  bookmarklet = decodeURIComponent(bookmarklet);

  const prettier = require('prettier');
  const formatted = prettier.format(bookmarklet, {
    parser: 'babel',
    singleQuote: true,
    trailingComma: 'none'
  });

  console.log(success('// decoded and prettier bookmarklet'));
  console.log(formatted);

  const clipboardy = require('clipboardy');
  clipboardy.writeSync(formatted);
  clipboardy.readSync();
} else {
  console.log(error('Empty input file.'));
}

process.exitCode = 0;
