import fs from 'fs';
import path from 'path';
import { test, expect, vi, beforeEach, afterEach } from 'vitest';

import makeBookmarklet from '../make-bookmarklet.js';
import unmakeBookmarklet from '../unmake-bookmarklet.js';
import clipboardy from 'clipboardy';
import { withTempDirAsync } from './utils/tempDir.js';

vi.mock('clipboardy', () => ({ default: { writeSync: vi.fn(), write: vi.fn() } }));

const fixturePath = path.join('src', '__tests__', '__fixtures__', 'input', 'whitespace.js');

beforeEach(() => {
  clipboardy.writeSync.mockClear();
  clipboardy.write.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('make-bookmarklet copies to clipboard by default', () => {
  const originalArgv = process.argv;
  process.argv = ['node', 'src/make-bookmarklet.js', fixturePath];
  makeBookmarklet();
  expect(clipboardy.writeSync).toHaveBeenCalled();
  process.argv = originalArgv;
});

test('make-bookmarklet --no-clipboard does not copy', () => {
  const originalArgv = process.argv;
  process.argv = ['node', 'src/make-bookmarklet.js', fixturePath, '--no-clipboard'];
  makeBookmarklet();
  expect(clipboardy.writeSync).not.toHaveBeenCalled();
  process.argv = originalArgv;
});

test('unmake-bookmarklet copies to clipboard by default', async () => {
  const originalArgv = process.argv;
  const bm = fs.readFileSync(fixturePath, 'utf8');
  await withTempDirAsync(async (tmpDir) => {
    const tmp = path.join(tmpDir, `tmp-${Date.now()}.js`);
    fs.writeFileSync(tmp, `javascript:${encodeURIComponent(bm)}`);
    try {
      process.argv = ['node', 'src/unmake-bookmarklet.js', tmp];
      await unmakeBookmarklet();
      expect(clipboardy.writeSync).toHaveBeenCalled();
    } finally {
      process.argv = originalArgv;
    }
  });
});

test('unmake-bookmarklet --no-clipboard does not copy', async () => {
  const originalArgv = process.argv;
  const bm = fs.readFileSync(fixturePath, 'utf8');
  await withTempDirAsync(async (tmpDir) => {
    const tmp = path.join(tmpDir, `tmp-${Date.now()}.js`);
    fs.writeFileSync(tmp, `javascript:${encodeURIComponent(bm)}`);
    try {
      process.argv = ['node', 'src/unmake-bookmarklet.js', tmp, '--no-clipboard'];
      await unmakeBookmarklet();
      expect(clipboardy.writeSync).not.toHaveBeenCalled();
    } finally {
      process.argv = originalArgv;
    }
  });
});
