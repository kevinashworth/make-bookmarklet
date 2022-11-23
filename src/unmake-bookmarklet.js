#!/usr/bin/env node
import fs from 'fs';
import { program } from 'commander';
import chalk from 'chalk';
import clipboardy from 'clipboardy';
import prettier from 'prettier';

const { version } = JSON.parse(fs.readFileSync('package.json'));
const error = chalk.bold.red;
const success = chalk.bold.green;
const verbose = chalk.bold.yellow;

let filename;
program
  .version(version)
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
