import { test, expect } from 'vitest';
import { execa } from 'execa';

test('make-bookmarklet --help prints usage', async () => {
  const { stdout } = await execa('node', ['src/make-bookmarklet.js', '--help']);
  expect(stdout).toContain('Usage: make-bookmarklet');
});

test('unmake-bookmarklet --help prints usage', async () => {
  const { stdout } = await execa('node', ['src/unmake-bookmarklet.js', '--help']);
  expect(stdout).toContain('Usage: unmake-bookmarklet');
});
