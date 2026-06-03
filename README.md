# make-bookmarklet

A bookmarklet is a browser bookmark that runs JavaScript code instead of opening a webpage. This tool converts a JavaScript file into bookmarklet format — a URL-encoded string you can paste into a browser bookmark's URL field.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Use](#use)
- [What would I want to use this for?](#what-would-i-want-to-use-this-for)
- [Options](#options)
- [Unmake / Reversal](#unmake--reversal)
- [Install](#install)

## Prerequisites

You need [Node.js](https://nodejs.org/). Node.js includes `npm`, which you'll use to install dependencies.

## Quickstart

Clone this repository, install dependencies, and run the tool on a script.

```bash
git clone https://github.com/kevinashworth/make-bookmarklet.git
cd make-bookmarklet
npm install
```

If you have a script of your own you'd like to convert, use that. Otherwise, use this trivial example from the repo:

```javascript
alert('Hello from a bookmarklet!');
```

Convert it:

```bash
node src/make-bookmarklet.js examples/hello.js
```

You'll see output like this (and it's also automatically copied to your clipboard):

```javascript
javascript:alert('Hello%20from%20a%20bookmarklet!');
```

Then save it as a bookmarklet in your browser. One way to create a bookmarklet: bookmark any page, then edit that bookmark and paste the string (already on your clipboard) into the URL field. Click your new bookmarklet on any page to run the code.

## Use

Run the tool on a JavaScript file:

```bash
node src/make-bookmarklet.js inputfile.js
```

It outputs the bookmarklet to the command line and also copies it to your clipboard.

Piping and stdout examples:

- Pipe an input script into the CLI: `cat script.js | node src/make-bookmarklet.js`
- Write output to a file using shell redirection: `node src/make-bookmarklet.js inputfile.js > out.txt`
- Disable clipboard copying when scripting: `node src/make-bookmarklet.js inputfile.js --no-clipboard > out.txt`

## What would I want to use this for?

For some ideas on what goes into an input file, see the [examples](examples) folder or see below. I often use an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), but you can see [the Shortwave folder](examples/shortwave) for a non-IIFE example.

Typically I test the output code in my browser console. Once it works to my liking there, I convert it to a bookmarklet in my browser's most-convenient bookmark folder.

### A complete, simple example

So, given `inputfile.js` in the top directory of this repo

```javascript
h = window.location.href;
i = h.indexOf('imdb.com');
p = h.indexOf('https://pro.imdb.com');
t = h.indexOf('title');
c = h.indexOf('combined');
f = h.indexOf('fullcredits');
r = h.indexOf('reference');
badword = Math.max(c, f, r);

if (i === -1) {
  window.location = 'https://pro.imdb.com/name/nm2825198/'
}
else if (p === 0) {
  window.location = h.replace('https://pro', 'https://www')
}
else if (p === -1) {
  if ((t > 1) && (badword > 1)) {
    h = h.substring(0, badword)
  }
  window.location = h.replace(/https:\/\/[a-z]+/, 'https://pro');
};
```

then, running `node src/make-bookmarklet.js inputfile.js` yields:

```javascript
javascript:var%20h=window.location.href;%20const%20i=h.indexOf('imdb.com');%20const%20p=h.indexOf('https://pro.imdb.com');%20const%20t=h.indexOf('title');%20const%20c=h.indexOf('combined');%20const%20f=h.indexOf('fullcredits');%20const%20r=h.indexOf('reference');%20const%20badword=Math.max(c,%20f,%20r);%20if%20(i===-1)%7Bwindow.location='https://pro.imdb.com/name/nm2825198/';%7Delse%20if%20(p===0)%7Bwindow.location=h.replace('https://pro',%20'https://www');%7Delse%20if%20(p===-1)%7Bif%20((t%3E1)%20&&%20(badword%3E1))%7Bh=h.substring(0,%20badword);%7Dwindow.location=h.replace(/https:%5C/%5C/%5Ba-z%5D+/,%20'https://pro');%20%7D
```

## Options

To keep your bookmarklet a little more readable, use the defaults. But to make more-compact or more-secure bookmarklets, try these options.

### **-a** Agressively remove code

JavaScript engines are very forgiving. So it can be safe to remove some JavaScript aggressively, which will mean relying on JavaScript engines to figure it out correctly, despite not following best coding practices. To remove a little more code before converting your script to a bookmarklet, just use the `--aggressive` (or `-a`) flag:

```bash
node src/make-bookmarklet.js inputfile.js --aggressive
```

The removals here go against best coding practices, but here's an opinion: it will probably not matter to your bookmarklet. So this is your warning — *Not declaring variables will pollute the global scope. The implied use of `window` may cause rare problems. Perhaps your code truly relies on `===` not `==`. Gasp. Take your chances!*

### **-c** Use encodeURIComponent

By default, we encode the reduced script using [`encodeURI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI), but if you wish to use [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) instead, use the `--component` (or `-c`) flag:

```bash
node src/make-bookmarklet.js -c inputfile.js
```

### **-d** Debug Mode (Verbose Output)

To see more of the make process printed to the console, use the `--debug` (or `-d`) flag:

```bash
node src/make-bookmarklet.js inputfile.js -d
```

### **-h** Help

To get help for these programs, and to see more examples, run:

```bash
node src/make-bookmarklet.js --help
```

Please note that any `options` can go before or after `filename`.

## Unmake / Reversal

To convert a bookmarklet back into more-readable code, run the `unmake` version:

```bash
node src/unmake-bookmarklet.js bookmarklet.js
```

Please note, this is not a true reversal or re-creation of any JavaScript that went in to creating a bookmarklet, but it does convert a hard-to-read bookmarklet into [`prettier`](https://prettier.io) code.

## Install

Clone this repo and install dependencies:

```bash
git clone https://github.com/kevinashworth/make-bookmarklet.git
cd make-bookmarklet
npm install
```

Then run with:

```bash
node src/make-bookmarklet.js inputfile.js
```

### For contributors

If you're contributing, see DEVELOPMENT.md for setup, testing, linting, and release notes. Please run `npm test` and `npm run lint` locally and add tests for public-facing changes before opening a PR.
