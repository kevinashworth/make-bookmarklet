## [2.0.3](https://github.com/kevinashworth/make-bookmarklet/compare/v2.0.2...v2.0.3) (2026-01-26)


### Bug Fixes

* test semantic-release workflow ([cbf5f6a](https://github.com/kevinashworth/make-bookmarklet/commit/cbf5f6aecc0a59eb41ef8a76a0488665824c38fd))
* update CI workflow to use RELEASE_PAT for secure token management ([cd40884](https://github.com/kevinashworth/make-bookmarklet/commit/cd4088463076fe408fb9d22d93724940225a8784))
* verify semantic-release configuration ([8a2d042](https://github.com/kevinashworth/make-bookmarklet/commit/8a2d04218a86fd2804adefd140743f0c214508af))
* verify semantic-release configuration ([53e88c1](https://github.com/kevinashworth/make-bookmarklet/commit/53e88c14566ea295c54c19acf86a1c3594efee83))

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
