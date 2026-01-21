# Changelog

## 2.0.0 — 2026-01-20

**BREAKING CHANGES**

- Migration to ESM: package is now ESM-only (package.json includes `"type": "module"`).
- Node.js 20 or newer is required (`engines.node` updated to `>=20`).
- Tests switched to Vitest and some internals (CLI and modules) now use `import`/`export`.

Other notable changes:

- Added `bin` entries for `make-bookmarklet` and `unmake-bookmarklet`.
- Updated README with Node >=20 requirement and `npx` guidance.
