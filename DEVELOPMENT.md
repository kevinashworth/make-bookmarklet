# Development Notes

This document is for maintainers and contributors (internal notes).

## Requirements
- Node.js 20 or newer (matches README). You can check with `node --version`.

## Local setup
1. Clone the repo and install dev dependencies: `npm i`.
2. Link the package locally for CLI testing: `npm link`.

## Running the CLI locally
- Run the CLI directly with node: `node src/make-bookmarklet.js <input-file>` or `node src/unmake-bookmarklet.js <input-file>`.
- After `npm link`, run `make-bookmarklet <input-file>` or `unmake-bookmarklet <input-file>`.

## Testing
- Run unit tests: `npm test` (Vitest is used).
- Add tests under `src/__tests__`. Use ESM `import` syntax and add CLI tests that use `execa`.
- Mock clipboardy in tests (example with Vitest: `vi.mock('clipboardy', () => ({ default: { writeSync: () => {}, write: async () => {} } }))`).

## Linting
- Run linter: `npm run lint` (semistandard). Fix with `npm run lint:fix`.

## Release & versioning (maintainer flow)
- Add a short CHANGELOG entry for the release in `CHANGELOG.md`.
- Bump version: `npm version patch|minor|major` (major for breaking changes; we used v2.0.0 for ESM migration).
- Push tags and branch: `git push --follow-tags origin <branch>`.
- Publish to npm (manual): `npm publish` or use your release automation.

## Branching & PR process
- Use topic branches for features (`kevin/<feature>`). Create PRs against `main` with a clear description and tests. Tag PRs with `breaking` and `semver:major` when appropriate.

## Notes
- The codebase is ESM-only (`package.json` `type: module`). Keep imports using `.js` for local module paths (e.g., `import foo from './foo.js'`).
- CLI entrypoints preserve the shebangs and are listed under `bin` in `package.json`.

If you want additional developer instructions added (build steps, CI workflows, or release automation), tell me where to add them and I’ll draft them.