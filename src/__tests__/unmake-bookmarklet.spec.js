import clipboardy from 'clipboardy';
import fs from 'fs';
import path from 'path';
import { test, expect, vi, beforeEach, afterEach } from 'vitest';

import unmakeBookmarklet from '../unmake-bookmarklet.js';
import { withTempDirAsync } from './utils/tempDir.js';

// Mock clipboardy globally for these tests
vi.mock('clipboardy', () => ({ default: { writeSync: vi.fn(), write: vi.fn() } }));

beforeEach(() => {
  clipboardy.writeSync.mockClear();
  clipboardy.write.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('formats bookmarklet content', async () => {
  const bm = "(function(){console.log('hi')})();";
  await withTempDirAsync(async (tmpDir) => {
    const tmp = path.join(tmpDir, 'bm.js');
    fs.writeFileSync(tmp, `javascript:${encodeURIComponent(bm)}`);
    const origArgv = process.argv;
    process.argv = ['node', 'src/unmake-bookmarklet.js', tmp];

    // spy on console.log
    const logSpy = vi.spyOn(console, 'log');
    try {
      await unmakeBookmarklet();
      // assert that formatted output appears in some console.log call
      const allLogs = logSpy.mock.calls.flat().join('\n');
      expect(allLogs).toMatch(/console\.log\('hi'\)/);
    } finally {
      process.argv = origArgv;
      logSpy.mockRestore();
    }
  });
});

test('prettier throwing sets non-zero exit and logs error', async () => {
  // Cause decodeURIComponent to throw by writing invalid percent-encoding
  await withTempDirAsync(async (tmpDir) => {
    const tmp = path.join(tmpDir, 'bm.js');
    fs.writeFileSync(tmp, 'javascript:%E0');
    const origArgv = process.argv;
    process.argv = ['node', 'src/unmake-bookmarklet.js', tmp];

    const logSpy = vi.spyOn(console, 'log');
    try {
      await unmakeBookmarklet();
      // expect non-zero exit code set
      expect(process.exitCode).toBe(1);
      const allLogs = logSpy.mock.calls.flat().join('\n');
      expect(allLogs).toMatch(/URI malformed|malformed/i);
    } finally {
      process.argv = origArgv;
      logSpy.mockRestore();
    }
  });
});

test('debug flag prints debug markers', async () => {
  const bm = "(function(){console.log('dbg')})();";
  await withTempDirAsync(async (tmpDir) => {
    const tmp = path.join(tmpDir, 'bm.js');
    fs.writeFileSync(tmp, `javascript:${encodeURIComponent(bm)}`);
    const origArgv = process.argv;
    process.argv = ['node', 'src/unmake-bookmarklet.js', tmp, '--debug'];

    const logSpy = vi.spyOn(console, 'log');
    try {
      await unmakeBookmarklet();
      const allLogs = logSpy.mock.calls.flat().join('\n');
      expect(allLogs).toMatch(/\[debug\] input/);
      expect(allLogs).toMatch(/decoded and prettier bookmarklet/);
    } finally {
      process.argv = origArgv;
      logSpy.mockRestore();
    }
  });
});

test('--no-clipboard prevents clipboard write', async () => {
  const bm = "(function(){console.log('nope')})();";
  await withTempDirAsync(async (tmpDir) => {
    const tmp = path.join(tmpDir, 'bm.js');
    fs.writeFileSync(tmp, `javascript:${encodeURIComponent(bm)}`);
    const origArgv = process.argv;
    process.argv = ['node', 'src/unmake-bookmarklet.js', tmp, '--no-clipboard'];

    try {
      await unmakeBookmarklet();
      expect(clipboardy.writeSync).not.toHaveBeenCalled();
    } finally {
      process.argv = origArgv;
    }
  });
});
