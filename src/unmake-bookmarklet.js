#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import clipboardy from 'clipboardy';
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

const { version } = JSON.parse(fs.readFileSync('package.json'));
const error = chalk.bold.red;
const success = chalk.bold.green;
const verbose = chalk.bold.yellow;

export default async function unmakeBookmarklet () {
  const program = new Command();
  let filename;
  program.arguments('[filename]').action((results) => {
    filename = results;
  });
  program.option('-d, --debug', 'verbose output to the command line')
    .option('--no-clipboard', 'do not copy output to clipboard');
  program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ node src/unmake-bookmarklet.js foo.js');
    console.log('  $ cat bookmarklet.js | node src/unmake-bookmarklet.js');
    console.log('  $ node src/unmake-bookmarklet.js foo.js --no-clipboard > pretty.js');
  });
  program.version(version);
  program.parse(process.argv);
  const options = program.opts();

  let bookmarklet;
  let source;
  try {
    if (!filename && !process.stdin.isTTY) {
      source = fs.readFileSync(0, 'utf8');
    } else if (filename) {
      source = fs.readFileSync(filename, 'utf8');
    } else {
      console.log(error('No input file specified.'));
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
    console.log(' ');
  }

  try {
    bookmarklet = source.replace(/^\s?javascript:/gm, '');
    bookmarklet = decodeURIComponent(bookmarklet);

    const formatted = await prettier.format(bookmarklet, {
      parser: 'babel',
      singleQuote: true,
      trailingComma: 'none'
    });

    const stdoutIsTTY = process.stdout.isTTY;
    if (!stdoutIsTTY && !options.debug) {
      console.log(formatted);
    } else {
      console.log(success('// decoded and prettier bookmarklet'));
      console.log(formatted);
    }

    // Copy to clipboard unless explicitly disabled
    if (options.clipboard) {
      try {
        clipboardy.writeSync(String(formatted));
        if (options.debug) {
          console.log(verbose('// [debug] copied to clipboard'));
        }
      } catch (err) {
        console.log(error(`Failed to copy to clipboard: ${err.message || err}`));
      }
    }

    process.exitCode = 0;
  } catch (err) {
    console.log(error(err.message || err));
    process.exitCode = 1;
  }
}

// Only execute when run directly
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  unmakeBookmarklet();
}
