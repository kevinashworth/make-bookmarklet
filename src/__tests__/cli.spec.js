import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execa } from 'execa';

const fixturePath = path.join('src', '__tests__', '__fixtures__', 'input', 'whitespace.js');

test('make-bookmarklet --help prints usage', async () => {
  const { stdout } = await execa('node', ['src/make-bookmarklet.js', '--help']);
  expect(stdout).toContain('Usage: make-bookmarklet');
});

test('unmake-bookmarklet --help prints usage', async () => {
  const { stdout } = await execa('node', ['src/unmake-bookmarklet.js', '--help']);
  expect(stdout).toContain('Usage: unmake-bookmarklet');
});

test('make-bookmarklet reads from stdin when piped', async () => {
  const input = fs.readFileSync(fixturePath, 'utf8');
  const { stdout } = await execa('node', ['src/make-bookmarklet.js'], { input });
  // When piped, stdout should be just the bookmarklet
  expect(stdout.trim().startsWith('javascript:')).toBe(true);
});

test('make-bookmarklet outputs bookmarklet to stdout', async () => {
  const { stdout } = await execa('node', ['src/make-bookmarklet.js', fixturePath]);
  expect(stdout.trim().includes('javascript:')).toBe(true);
});

test('unmake-bookmarklet reads from stdin when piped', async () => {
  const bm = fs.readFileSync(path.join('src', '__tests__', '__fixtures__', 'input', 'whitespace.js'), 'utf8');
  const { stdout } = await execa('node', ['src/unmake-bookmarklet.js'], { input: `javascript:${encodeURIComponent(bm)}` });
  expect(stdout.trim().length).toBeGreaterThan(0);
});

test('unmake-bookmarklet runs with relative path and file argument', async () => {
  const { stdout } = await execa('node', ['src/unmake-bookmarklet.js', 'examples/bookmarklets/b1.js']);
  // When run non-interactively (captured stdout), CLI prints the formatted code; assert content is present
  expect(stdout).toContain("earningsList_rppDD");
});

test('unmake-bookmarklet runs with ./src path', async () => {
  const { stdout } = await execa('node', ['./src/unmake-bookmarklet.js', 'examples/bookmarklets/b1.js']);
  expect(stdout).toContain("earningsList_rppDD");
});

test('unmake-bookmarklet runs with absolute script path', async () => {
  const script = path.resolve('src/unmake-bookmarklet.js');
  const { stdout } = await execa('node', [script, 'examples/bookmarklets/b1.js']);
  expect(stdout).toContain("earningsList_rppDD");
});
