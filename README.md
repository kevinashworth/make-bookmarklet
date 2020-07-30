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

The help output will look something like this:
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

## Options
Please note that any `options` can go before *or* after the `filename`.

To keep your bookmarklet a little more readable, use the defaults. But to make more-compact or more-secure bookmarklets, try these options.

### Agressively remove code
JavaScript engines are very forgiving. So it can be safe to remove some JavaScript aggressively, which will mean relying on JavaScript engines to figure it out correctly, despite not following best coding practices. To remove a little more code before converting your script to a bookmarklet, just use the `aggressive` (or `-a`) flag:
```
node make-bookmarklet inputfile.js --aggressive
```

The removals here go against best coding practices, but here’s an opinion: it will probably not matter to your bookmarklet. So this is your warning — Not declaring variables will pollute the global scope. The implied use of `window` may cause rare problems. Perhaps your codetruly relies on `===` not `==`. Take your chances!

### Use encodeURIComponent
By default, we encode the reduced script using `encodeURI`, but if you wish to use `encodeURIComponent` instead, use the `--component` (or `-c`) flag:
```
node make-bookmarklet.js -c inputfile.js
```

## Reversal
To convert a bookmarklet into more-readable code, run the `unmake` version:
```
node unmake-bookmarklet bookmarklet.js
```

Please note, this is not a true reversal or re-creation of any input JavaScript that went in to creating a bookmarklet, but it does convert an already minified bookmarklet into much more readable code.
