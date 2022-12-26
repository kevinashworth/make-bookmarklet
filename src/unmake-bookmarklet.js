#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const { program } = require('commander');
const prettier = require('prettier');

const { version } = JSON.parse(fs.readFileSync('package.json'));
const error = chalk.bold.red;
const success = chalk.bold.green;
const verbose = chalk.bold.yellow;

let filename;
program.arguments('<filename>').action((results) => {
  filename = results;
});
program.option('-d, --debug', 'verbose output to the command line');
program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ node src/unmake-bookmarklet.js foo.js');
  console.log('  $ node src/unmake-bookmarklet /Users/baz/Documents/bar.js -d');
});
program.version(version);
program.parse(process.argv);
const options = program.opts();

let bookmarklet;
const source = fs.readFileSync(filename, 'utf8');

if (source) {
  if (options.debug) {
    console.log(verbose('// [debug] input'));
    console.log(source);
    console.log(' ');
  }
  bookmarklet = source.replace(/^\s?javascript:/gm, '');
  bookmarklet = decodeURIComponent(bookmarklet);

  const formatted = prettier.format(bookmarklet, {
    parser: 'babel',
    singleQuote: true,
    trailingComma: 'none'
  });

  console.log(success('// decoded and prettier bookmarklet'));
  console.log(formatted);

  clipboardy.writeSync(formatted);
  clipboardy.readSync();
} else {
  console.log(error('Empty input file.'));
}

process.exitCode = 0;
