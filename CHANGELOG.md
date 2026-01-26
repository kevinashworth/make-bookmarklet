# Changelog

## [2.0.2](https://github.com/kevinashworth/make-bookmarklet/compare/v2.0.1...v2.0.2) (2026-01-23)

### Bug Fixes

- proper YAML syntax ([afa34e5](https://github.com/kevinashworth/make-bookmarklet/commit/afa34e50e9c6e5759c7fcaf50ef42aa29fa8e65b))
- update permissions for CI jobs in workflow ([aa37ff6](https://github.com/kevinashworth/make-bookmarklet/commit/aa37ff6af82edd62650ff797fdf101688e737b54))

## 2.0.0 — 2026-01-20

### BREAKING CHANGES

- Migration to ESM: package is now ESM-only (package.json includes `"type": "module"`).
- Node.js 22 or newer is required (`engines.node` updated to `>=22`).
- Tests switched to Vitest and some internals (CLI and modules) now use `import`/`export`.

Other notable changes:

- Added `bin` entries for `make-bookmarklet` and `unmake-bookmarklet`.
- Updated README with Node >=20 requirement and `npx` guidance.

## 2.0.1 — 2026-01-22

### FIXES

- Tests: made tests more robust; fixed `unmake-bookmarklet` unit test to exercise decode errors instead of mocking `prettier.format`, avoiding fragile tests.
- Tests: minor mocking, cleanup, and reliability improvements.
- No functional or CLI behavior changes.
