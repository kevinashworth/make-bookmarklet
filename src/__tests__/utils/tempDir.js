import fs from 'fs';
import os from 'os';
import path from 'path';

const tmpDirPrefix = 'mb-test-';

export function withTempDir (fn) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), tmpDirPrefix));
  try {
    return fn(tmpDir);
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {
      // Best-effort cleanup: warn on failure but do not fail the test
      try {
        console.warn(`Temp cleanup failed for ${tmpDir}: ${e && (e.message || e)}`);
      } catch (logErr) {
        // ignore logging errors
      }
    }
  }
}

export async function withTempDirAsync (fn) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), tmpDirPrefix));
  try {
    return await fn(tmpDir);
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {
      // Best-effort cleanup: warn on failure but do not fail the test
      try {
        console.warn(`Temp cleanup failed for ${tmpDir}: ${e && (e.message || e)}`);
      } catch (logErr) {
        // ignore logging errors
      }
    }
  }
}
