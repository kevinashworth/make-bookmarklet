# Development Notes

This document is for maintainers and contributors (internal notes).

## Quick checklist (short)

- Create a branch: `git checkout -b my/feature`
- Do work and commit using Conventional Commits (e.g., `feat:`, `fix:`)
- Lint: `npm run lint`
- Lint: `npm run lint:md`
- Fix markdownlint issues: `npm run lint:md:fix`
- Test: `npm test -- --run`
- Push branch, open a PR against `main`, get 1 approval and wait for checks to pass
- Merge PR to `main`
- Verify: check Actions, GitHub Releases, tags, and `CHANGELOG.md`

TODO: Ensure this checklist is correct for changesets

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

- Run oxc linter: `npm run lint`. Fix with `npm run lint:fix`.
- Run Markdown linter: `npm run lint:md`. Auto-fix supported Markdown issues with `npm run lint:md:fix`.
- Note: `npm run lint:md:fix` only fixes rules that `markdownlint-cli2` can safely rewrite. Any issues still reported after that command require manual changes.

## Release & versioning (maintainer flow)

TODO: Write up changesets flow.

## Branching & PR process

- Use topic branches for features (`kevin/<feature>`). Create PRs against `main` with a clear description and tests.

## Notes

- The codebase is ESM-only (`package.json` `type: module`). Keep imports using `.js` for local module paths (e.g., `import foo from './foo.js'`).
- CLI entrypoints preserve the shebangs and are listed under `bin` in `package.json`.
