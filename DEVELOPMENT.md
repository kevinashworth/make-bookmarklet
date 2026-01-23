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

We now use `semantic-release` in CI (installed at runtime) to automate version bumps and GitHub releases using Conventional Commits. Key points:

- `semantic-release` runs in CI (runtime install) and determines the next version using Conventional Commits.
- Releases happen automatically on **push** to `main`; pull requests will not trigger releases.
- We are **not publishing to npm yet**. The release job creates GitHub releases and tags but does not perform `npm publish`.

Files & configuration:

- `.releaserc.json` — config file (uses the `conventionalcommits` preset and plugins): `@semantic-release/commit-analyzer`, `@semantic-release/release-notes-generator`, `@semantic-release/changelog`, and `@semantic-release/github`.
- `.github/workflows/ci.yml` — contains a `release` job that:
  - runs only on pushes to `main` (an `if` guard is used),
  - depends on the `test` job (so tests/lint must pass),
  - checks out with `fetch-depth: 0`,
  - installs `semantic-release` and required plugins at runtime (`npm install --no-save ...`), and
  - runs `npx semantic-release@latest` using the `GITHUB_TOKEN` provided by GitHub Actions.

Testing & rollout:

- To validate behavior locally or in a branch, first install `semantic-release` and the required plugins temporarily (they are installed in CI by the workflow), or use the convenience npm script added to this repo:

```bash
# Manual install + dry-run
npm install --no-save semantic-release @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/changelog @semantic-release/github
npx semantic-release --dry-run

# Convenience script (recommended for maintainers)
npm run release:dry-run
```

- Note: `semantic-release` loads plugins from your environment, so running `npx semantic-release` without the plugins installed will cause a `MODULE_NOT_FOUND` error (e.g., `Cannot find module '@semantic-release/changelog'`). In CI we install the plugins at runtime to avoid adding them as dev dependencies.
- Monitor the first automated release to verify the GitHub release notes and tags are created as expected.

Further considerations:

- If you want `CHANGELOG.md` committed back to the repo, add `@semantic-release/git` to the plugin list — be careful to avoid CI loops when committing from the workflow.
- When you're ready to publish to npm, add `@semantic-release/npm` and configure an `NPM_TOKEN` repository secret; update the release job to provide `NPM_TOKEN` to the environment.
- Consider enforcing Conventional Commits with `commitlint` + `husky` or a CI check to ensure reliable release behavior.
- Update contributor docs to encourage Conventional Commit style for commit messages.

If you'd like, I can also add a `--dry-run` test step or enable `@semantic-release/git` in a follow-up change.

## Branching & PR process
- Use topic branches for features (`kevin/<feature>`). Create PRs against `main` with a clear description and tests. Tag PRs with `breaking` and `semver:major` when appropriate.

## Notes
- The codebase is ESM-only (`package.json` `type: module`). Keep imports using `.js` for local module paths (e.g., `import foo from './foo.js'`).
- CLI entrypoints preserve the shebangs and are listed under `bin` in `package.json`.

If you want additional developer instructions added (build steps, CI workflows, or release automation), tell me where to add them and I’ll draft them.