# make-bookmarklet

## Install

### Prerequisites
- Have a knowledge of Javascript and the command line
- Install [Node.js](https://nodejs.org/)

### Steps
- Clone this repository
- Then `cd` into it and run `npm install`


## Use
To run `make-bookmarklet`:
```
node make-bookmarklet inputfile.js
```

This creates a bookmarklet out of the code in `inputfile.js`, and outputs this new bookmarklet to the command line and also copies it to the clipboard.

## Help
To get help for this program, and to see more examples, run:
```
node make-bookmarklet.js --help
```

The output will look somewhat like this:
```
Usage: make-bookmarklet [options] <filename>

Options:
  -a, --aggressive  agressively remove code
  -c, --component   encode URI component
  -V, --version     output the version number
  -h, --help        display help for command

Examples:
  $ node make-bookmarklet.js foo.js
  $ node make-bookmarklet /Users/baz/Documents/bar.js --aggressive
```

Please note that any `options` can go before *or* after the `filename`.

## Options
To keep your bookmarklet a little more readable, use the defaults. But to make more-compact or more-secure bookmarklets, try these options.

JavaScript engines are very forgiving. To zap code aggressively, which means relying on engines to figure it out correctly, despite not following best coding practices, use the `aggressive` (or `-a`) flag:
```
node make-bookmarklet inputfile.js --aggressive
```

By default, we encode the reduced script using `encodeURI`, but if you wish to use `encodeURIComponent` instead, use the `--component` (or `-c`) flag:
```
node make-bookmarklet.js -c inputfile.js
```

## Reversal
To convert a bookmarklet into more-readable code, run the ‘unmake’ version:
```
node unmake-bookmarklet bookmarklet.js
```

Please note, this is not a true reversal or re-creation of any input JavaScript that went in to creating a bookmarklet, but it does make a bookmarklet much more readable.
