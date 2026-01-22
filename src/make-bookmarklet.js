#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import clipboardy from 'clipboardy';
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import path from 'path';
import encodeBookmarklet from './encodeBookmarklet.js';
import prepareBookmarklet from './prepareBookmarklet.js';

export default function makeBookmarklet () {
  const { version } = JSON.parse(fs.readFileSync('package.json'));
  const error = chalk.bold.red;
  const success = chalk.bold.green;
  const verbose = chalk.bold.yellow;

  const program = new Command();
  let filename;
  program.arguments('[filename]').action((results) => {
    filename = results;
  });
  program
    .option('-a, --aggressive', 'agressively remove code')
    .option('-c, --component', 'use encodeURIComponent, not encodeURI')
    .option('-d, --debug', 'verbose output to the command line')
    .option('--no-clipboard', 'do not copy bookmarklet to clipboard');
  program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ node src/make-bookmarklet.js foo.js');
    console.log('  $ cat foo.js | node src/make-bookmarklet.js');
    console.log('  $ node src/make-bookmarklet.js foo.js --no-clipboard > out.txt');
  });
  program.version(version);
  program.parse(process.argv);
  const options = program.opts();

  // Read source from filename, or from stdin when no filename and stdin is piped
  let source;
  try {
    if (!filename && !process.stdin.isTTY) {
      source = fs.readFileSync(0, 'utf8');
    } else if (filename) {
      source = fs.readFileSync(filename, 'utf8');
    } else {
      console.log(error('No input file specified.')); // interactive use
      process.exitCode = 1;
      return;
    }
  } catch (e) {
    console.log(error('Failed to read input: ' + (e.message || e)));
    process.exitCode = 1;
    return;
  }

  if (!source) {
    console.log(error('Empty input file.'));
    process.exitCode = 1;
    return;
  }

  if (options.debug) {
    console.log(verbose('// [debug] input'));
    console.log(source);
  }
  const prepared = prepareBookmarklet(source, options);
  if (options.debug) {
    console.log(verbose('// [debug] bookmarklet before encoding'));
    console.log(prepared);
  }
  const bookmarklet = encodeBookmarklet(prepared, options);

  // If stdout is piped, print only the bookmarklet (suitable for piping)
  const stdoutIsTTY = process.stdout.isTTY;
  if (!stdoutIsTTY && !options.debug) {
    console.log(bookmarklet);
  } else {
    console.log(success('// bookmarklet'));
    console.log(bookmarklet);
  }

  // Copy to clipboard unless explicitly disabled
  if (options.clipboard) {
    try {
      clipboardy.writeSync(bookmarklet);
      if (options.debug) console.log(verbose('// [debug] copied to clipboard'));
    } catch (err) {
      console.log(error(`Failed to copy to clipboard: ${err.message || err}`));
    }
  }

  process.exitCode = 0;
}

// Only execute when run directly
const _scriptResolved = process.argv[1] ? path.resolve(process.argv[1]) : undefined;
if (fileURLToPath(import.meta.url) === _scriptResolved) {
  makeBookmarklet();
}
