#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const { program } = require('commander');
const getBookmarklet = require('./getBookmarklet');

function makeBookmarklet () {
  const { version } = JSON.parse(fs.readFileSync('package.json'));
  const error = chalk.bold.red;
  const success = chalk.bold.green;
  const verbose = chalk.bold.yellow;

  let filename;
  program.arguments('<filename>').action((results) => {
    filename = results;
  });
  program
    .option('-a, --aggressive', 'agressively remove code')
    .option('-c, --component', 'use encodeURIComponent, not encodeURI')
    .option('-d, --debug', 'verbose output to the command line');
  program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ node src/make-bookmarklet.js foo.js');
    console.log(
      '  $ node src/make-bookmarklet /Users/baz/Documents/bar.js -ac'
    );
  });
  program.version(version);
  program.parse(process.argv);
  const options = program.opts();

  const source = fs.readFileSync(filename, 'utf8');
  if (!source) {
    console.log(error('Empty input file.'));
    process.exitCode = 1;
    return;
  }

  if (options.debug) {
    console.log(verbose('// [debug] input'));
    console.log(source);
  }
  const bookmarklet = getBookmarklet(source, options);

  console.log(success('// bookmarklet'));
  console.log(bookmarklet);

  clipboardy.writeSync(bookmarklet);
  clipboardy.readSync();
  if (options.debug) {
    console.log(verbose('// [debug] copied to clipboard'));
  }
  process.exitCode = 0;
}

makeBookmarklet();
