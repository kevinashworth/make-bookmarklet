# Changelog

## 2.0.0 — 2026-01-20

**BREAKING CHANGES**

- Migration to ESM: package is now ESM-only (package.json includes `"type": "module"`).
- Node.js 20 or newer is required (`engines.node` updated to `>=20`).
- Tests switched to Vitest and some internals (CLI and modules) now use `import`/`export`.

Other notable changes:

- Added `bin` entries for `make-bookmarklet` and `unmake-bookmarklet`.
- Updated README with Node >=20 requirement and `npx` guidance.

## 2.0.1 — 2026-01-22

**FIXES**

- Tests: made tests more robust; fixed `unmake-bookmarklet` unit test to exercise decode errors instead of mocking `prettier.format`, avoiding fragile tests.
- Tests: minor mocking, cleanup, and reliability improvements.
- No functional or CLI behavior changes.
